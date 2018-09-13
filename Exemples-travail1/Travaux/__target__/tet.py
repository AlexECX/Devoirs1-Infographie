with open("main.py", "r+") as js:
    lines = js.read().split("\n")
    new_lines = []
    for line in lines:
        for i,c in enumerate(line):
            if c == "#":
                if "__pragma" in line[i:] or  "__:" in line[i:]:
                    new_lines.append(line)
                    break
                else:
                    new_lines.append(line[:i] + "__pragma__('js','" + line[i+1:] + "')")
                    break
    