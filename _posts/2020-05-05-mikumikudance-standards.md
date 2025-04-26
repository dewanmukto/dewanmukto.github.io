---
layout: post
title:  "MikuMikuDance Standard Environment"
description: "Quick guide to use the Raycast (RayMMD) features"
author: dmimukto
categories: [ animation, mmd ]
published: true
---

> This was originally written on 5th May 2020, but recovered by me on 26th April 2025 (which is the date when I posted this here)

## THE STANDARD PROCEDURE TO SET UP THE GRAPHIC EFFECTS AND ENVIRONMENT
### ~ endorsed by Dewan M.I. Mukto ~

```
Note : For newcomers, all the files and items being referred to, such as "Skybox" is a folder
	inside the RayCast folder. And these ">" arrows represent going inside those folders to find
	the file required, e.g. "Time of Day.pmx"
	All the commands like "load model" and "load accessory" are highlighted in the menu display
	somewhere. Get used to the GUI of MMD!!
	And, all steps have been checked carefully. Everything is accurate.
	References to "MME" means opening the "MMEffect" option in the top right corner. Setting effects on objects
	via MME is easy - just right-click to find that option.
	References to anything with "~" symbols on front and back means choosing a stage/model/motion of
	your choice.
```



### [ Initial ]
```
Load model : Skybox > Time of day.pmx
Switch to "camera" 
Load accessory : ray.x
Switch to "camera"
Load model : ~Stage~
Switch to "camera"
Change view angle : 52 (typical)
```


### [ Stage ]
```
Open MME
Goto "Main"
	Set effect on ~Stage~ : main.fx
Goto "EnvLightMap"
	Set effect on "Time of day" : Skybox > Time of Day > time of lighting.fx
Goto "FogMap"
	Set effect on "Time of day" : Skybox > Time of Day > time of fog with godray with cloud caster.fx
Load model : ray_controller.pmx
Deselect
Switch to "camera"
	Use X, Y, Z knobs to adjust sunlight under "light manipulation" tab
Register
Open MME
Extract subsets of ~Stage~ model and remove parts not needed under "MaterialMap". Uncheck that particular number from every tab in MME.
Switch to "ray_controller"
Deselect
Adjust "Sunlight+"	(typical : 0.230)
Adjust "Temperature+"	(typical : 0.310)
Adjust "SSAO-"	/ "Sunlight+"	(typical : 0.570)
Switch to "Time of Day"
Deselect
Adjust "FogIntensity+" / "MiePhase+" (typical : 0.340)
Adjust "SunTurbidity+" / "SunRadius+"	(typical : 0.540)
Adjust "OzoneMass+" / "SunTurbidity+"	(typical : 0.350)
Adjust "MiePhase+"	(typical : 0.800)
Adjust "MieTurbidity+"	(typical : 0.580)
```

### [ Model ]
```
Load model : ~Model~ (possibly named with extension ".pmd" or ".pmx")
Open MME
Goto "Main"
	Set effect on ~Model~ : main.fx
```


### [ Camera Motion ]
```
Make sure "camera/light/accessory" is selected in the model manipulation tab on the bottom menu bar.
Goto "File" on the top menu bar.
Select "load motion data"
Select the ~Motion~ (possibly named with extension ".vmd")
Done
```


### [ Model Motion ]
```
Now make sure the ~Model~ is selected in the model manipulation tab on the bottom menu bar.
Goto "File" on the top menu bar.
Select "load motion data"
Select the ~Motion~ (possibly named with extension ".vmd")
Done
```

### [ Load audio ]
```
Goto "File" on the top menu bar
Select "load WAV file"
Locate the audio file (usually provided with the Motion data folder)
```

### [ Render & Export ]
```
On the "frame manipulation" menu on the left, select the arrow that looks like this : " >| "
Note (remember) the number shown. If there is an uncertainty, take the largest number shown to the right.
Now select "View" from the top menu bar. Select "Screen size". Enter the resolution you need.
(Suggested : 1280 x 720 for normal, 1920 x 1080 for HD)
Finally, goto "File" on the top menu bar
Select "Render to AVI"
Select the spot where you wish to drop-off the exported product (video).
Give it a nice name of your choice. Hit "Save".
Enter the frame rate = 60
Enter the frame range = 0 [default] , *** [the nuber you got with the above steps]
Select the AVI compressor drop-down list. Now select MPEG compressor.
Ready, 3, 2, 1.... hit "OK" 
And wait till the video finishes rendering!!
Find that video once finished rendering.
Play it. And congratulate yourself!!
```

Have a nice day!!
