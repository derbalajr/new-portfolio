#!/usr/bin/env python3
"""Audit: every NEWLY-INTRODUCED base-level visual utility should have a
responsive counterpart (md:/lg:/xl:) in the same class list, restoring today's
value at desktop widths.

A token only counts as newly introduced if it appears in the diff's added lines
and NOT in its removed lines — otherwise a rewritten className would flag every
untouched utility on it. Colour utilities are excluded: they carry no size or
spacing and need no twin.
"""
import re
import subprocess
from collections import defaultdict

SIZE_PREFIXES = (
    "px-", "py-", "pt-", "pb-", "pl-", "pr-", "p-",
    "mt-", "mb-", "ml-", "mr-", "mx-", "my-", "m-",
    "gap-x-", "gap-y-", "gap-", "rounded-", "aspect-",
    "min-h-", "max-w-", "w-", "h-", "leading-", "tracking-", "blur-",
)
TEXT_SIZE = re.compile(r"^text-(\[[^\]]*(px|rem|em|vw|clamp)[^\]]*\]|xs|sm|base|lg|xl)$")
VARIANT = re.compile(r"^(sm|md|lg|xl|2xl):")

diff = subprocess.run(
    ["git", "diff", "main", "--unified=0", "--", "components", "app"],
    capture_output=True, text=True, check=True,
).stdout

added, removed = [], []
for line in diff.splitlines():
    if line.startswith("+") and not line.startswith("+++"):
        added.append(line[1:])
    elif line.startswith("-") and not line.startswith("---"):
        removed.append(line[1:])


def class_lists(lines):
    blob = "\n".join(lines)
    found = re.findall(r'className=(?:"([^"]*)"|\{`([^`]*)`\})', blob)
    return [re.sub(r"\$\{[^}]*\}", " ", (a or b)) for a, b in found]


def is_visual(tok):
    bare = VARIANT.sub("", tok)
    if TEXT_SIZE.match(bare):
        return True
    return any(bare.startswith(p) for p in SIZE_PREFIXES)


def key(tok):
    bare = VARIANT.sub("", tok)
    if TEXT_SIZE.match(bare):
        return "text-"
    for p in sorted(SIZE_PREFIXES, key=len, reverse=True):
        if bare.startswith(p):
            return p
    return ""


def base_tokens(cls_lists):
    out = set()
    for cl in cls_lists:
        for t in cl.split():
            if not VARIANT.match(t) and is_visual(t):
                out.add(t)
    return out


old = base_tokens(class_lists(removed))
new_lists = class_lists(added)
genuinely_new = base_tokens(new_lists) - old

findings = defaultdict(list)
for cl in new_lists:
    toks = cl.split()
    responsive_keys = {key(t) for t in toks if VARIANT.match(t) and is_visual(t)}
    for t in toks:
        if VARIANT.match(t) or not is_visual(t):
            continue
        if t in genuinely_new and key(t) not in responsive_keys:
            findings[t].append(cl)

print(f"class lists in added lines : {len(new_lists)}")
print(f"genuinely new base tokens  : {len(genuinely_new)}")
print(f"NO responsive twin         : {len(findings)}\n")
for tok in sorted(findings):
    ctx = findings[tok][0]
    scope = "lg:hidden" if "lg:hidden" in ctx else ("md:" if "md:" in ctx else "-")
    print(f"  {tok:<58} [{scope}]")
