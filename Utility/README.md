# Utilities
Utilities used in the plugin samples.

## Interpolator
Interpolator.ts contains a class which represents a critically damped spring. This allows you to procedurally interpolate a number. The interpolation that this class produces cannot represent a spline or curve from start-to-end times, and should not be used for time sensitive interpolation.

## Memory Watcher
MemoryWatcher.ts contains a class which allows you to specificy an address space (and ignored offsets within) to watch. This class is capable of telling you the number of times variables [of a specified size] have been changed, and what their new buffers are. This also includes the ability to manually scan for changed and unchanged variables.

## Z64Input
Z64Input.ts contains a class which was engineered to take a controller structure from Ocarina of Time, and can interpret input into readable button states of Up, Pressed, and Down. Furthermore, as a button is down, it has an incrementing timer that describes how long it has been pressed.

~~## Vector3
Vector3.ts contains a class with a 3-scalar [3D] vector and math utility with this in mind.~~
Vector3 has been implemented into Modloader. The version found in this repository is deprecated.


