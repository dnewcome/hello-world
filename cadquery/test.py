import cadquery as cq

# Create cube
cube = cq.Workplane("XY").box(20, 20, 20)

letters = ["A", "B", "C", "D", "E", "F"]

for face, letter in zip(cube.faces().vals(), letters):
    # Chained workplane starting from the solid
    wp = cq.Workplane(cube).faces(face).workplane(centerOption="CenterOfMass")

    # Create text along the face normal
    txt = wp.text(letter, 5, -0.5)

    # Cut into the solid
    cube = cube.cut(txt)

# Show the cube
show_object(cube)
