# Project Name

## Build 

```
$ yarn install
```
If on running on ios 
```
$ cd ios
$ pod install
```

## Run

**Make sure you have the applicable environment files before running the application.**

The project contains different environments:
* development
* staging
* production

Each environment has a corresponding environment variable file:
* .env - development
* .env.staging - staging 
* .env.production - production 

### Build Modes
The project can be built with any environment in debug and release mode.
### Android

Debug mode
```
$ yarn run android
```
```
$ yarn run android:staging
```
```
$ yarn run android:prod
```

Release mode

```
$ yarn run android:release
```
```
$ yarn run android:release:staging
```
```
$ yarn run android:release:prod
```

### Ios

Debug mode
```
$ yarn run ios
```
```
$ yarn run ios:staging
```
```
$ yarn run ios:prod
```

Release mode

```
$ yarn run ios:release
```
```
$ yarn run ios:release:staging
```
```
$ yarn run ios:release:prod
```
