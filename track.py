import re

with open('app/page.tsx', 'r') as f:
    lines = f.readlines()

stack = []
extra_closes = []
for i, line in enumerate(lines):
    line = re.sub(r'\{/\*.*?\*/\}', '', line)
    line = re.sub(r'//.*', '', line)
    
    opens = len(re.findall(r'<div\b[^>]*(?<!/)>', line))
    closes = len(re.findall(r'</div\s*>', line))
    
    for _ in range(opens):
        stack.append(i + 1)
    for _ in range(closes):
        if stack:
            stack.pop()
        else:
            extra_closes.append(i + 1)

print("Extra close tags at lines:", extra_closes)
print("Unclosed open tags at lines:", stack)
