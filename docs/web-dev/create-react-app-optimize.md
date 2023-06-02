# Dark Art of decreasing react-app initialization time
With recently jumping to React ecosystem, I was greatly surprised by high loading time on `create-react-app` on subsequent runs, sometime even crossing 3 minute mark. 

From what I expected, it was obvious for package manager to cache the modules on subsequent runs and just verify the integrity of the cache. However, that was not the case with `npm` or `yarn`. I tried `--offline` flag, but all in vain.

Seems like ***create-react-app*** simply installs react, react-dom, react-scripts and cra-template etc, along with some template react code to start with. 

Global install also doesn't seem to help either. So, it seems like `create-react-app` tool forces fresh installation ignoring the cache.

## Tools Required
1. Package Managers like `yarn`. `npm` doesn't allow using explicit caching.
2. Fast and stable Internet Speed.
3. UNIX based System. [It can easily transported to Windows too.]

## Initial Approach

### Generating the Cache [Only once]

First we will forcibly create cache by using our package manager, any local or global install will work.

``` bash
yarn global add create-react-app
cd ~
yarn create react-app react_source_app
```

First, we are installing react-app for users who haven't done it yet. Then we are creating a new seed react project in home directory. 
Don't edit the created app, we will use them as partial buffer for subsequent runs.

### On Subsequent Runs
Instead of running the above code we will run for each project initialization, we can simply run the commands given below. These are aimed to take less bandwidth as well as time during the install.

``` bash
mkdir <name-of-project>
cd <name-of-project>
yarn init
yarn add --offline react react-dom react-scripts cra-template web-vitals
cp -r ~/react_source_app/public ./
cp -r ~/react_source_app/src ./
cp ~/react_source_app/README.md ./
cp ~/react_source_app/package.json ./
```

This will basically force yarn to use offline cache for dependencies for our React app. Using that will drastically reduce network bandwidth as well as initialization time. 

### Updating Packages
User can update react file monthly to ensure having best of both world.

``` bash
cd ~/react_source_app
yarn install
```
You can even delete ***react_source_app*** directory completely and then re-run step 1.

### Benchmarks

| Process | Time took | Data Utilized |
| --- | ---- | --- |
| `yarn global add create-react-app` | 5.73s | ~2MB |
|`yarn create react-app react_source_app` (First Run)| 642.82s | ~170MB |
|`yarn create react-app react_source_app` (Subsequent Run)| 727.67s | ~150MB |
|`yarn init`| 3.53s | NA |
|`yarn add --offline react react-dom react-scripts cra-template web-vitals`| 22.21s | NA |

Data Utilized are tentative and are not actual indication of what `create-react-app` uses in long run. I have used my PC for benchmarking purpose and might not be representative of other systems. Timing are subject to Internet Bandwidth.(I had poor bandwidth)

## Result
With this small set of hack, we can not only speed up our development, but also save on some expensive data. Note that, I will recommend going with `yarn create react-app <app-name>` for critical apps and apps of great use. But for learning purpose, these steps can be your go to destination.

### Alternate Title
Decrease create-react-app running time<br>
Initialize react-app without internet