import re
with open('app/page.tsx', 'r') as f:
    code = f.read()

# remove comments
code = re.sub(r'\{/\*.*?\*/\}', '', code, flags=re.DOTALL)
code = re.sub(r'//.*', '', code)

opens = len(re.findall(r'<div\b[^>]*>', code))
closes = len(re.findall(r'</div\s*>', code))

print(f"Open divs: {opens}")
print(f"Close divs: {closes}")
