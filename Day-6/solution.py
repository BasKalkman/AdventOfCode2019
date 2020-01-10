data = open('./input.txt').read().splitlines()

orbits = {}
for orbit in data:
    parent, child = orbit.split(")")
    orbits[str(child)] = {
        "name": str(child),
        "orbits": str(parent) 
    }


count_total_orbits = 0
for orbit in orbits.values():
    current = orbit
    count_total_orbits += 1
    while current["orbits"] != 'COM':
        count_total_orbits += 1        
        current = orbits[current["orbits"]]
    
print(count_total_orbits)
