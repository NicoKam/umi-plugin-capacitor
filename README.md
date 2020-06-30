# umi-plugin-capacitor

更方便地使用`capacitor`进行`hybrid-app`开发 (for `umijs@3`)

[![NPM version](https://img.shields.io/npm/v/umi-plugin-capacitor.svg?style=flat)](https://npmjs.org/package/umi-plugin-capacitor)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-capacitor.svg?style=flat)](https://npmjs.org/package/umi-plugin-capacitor)


## 功能介绍

插件功能比较简单，目的是帮助开发者在运行时结合`capacitor`进行模拟器/真机调试。

插件灵感来自[umi-plugin-cordova](https://www.npmjs.com/package/umi-plugin-cordova)

## Install

```bash
# npm or yarn
$ npm install umi-plugin-capacitor @capacitor/cli @capacitor/core -D
```

## Usage

`umijs@3`会扫描符合命名规则的插件并自动注册

### 添加scripts

请在package.json添加如下命令以便使用

```json
{
  "scripts":{
    "init": "cap init",
    "add-ios": "cap add ios",
    "add-android": "cap add android",
    "android": "umi dev --android",
    "ios": "umi dev --ios",
    "build-android": "umi build --android",
    "build-ios": "umi build --ios",
    "start": "umi dev",
    "build": "umi build"
  }
}
```

### 初始化项目

```bash
# 根据提示生成capacitor.config.json
npm run init
```

### 运行项目

```bash
# web 模式
npm start

# android 模式
npm run andoird

# TODO: ios 模式
npm run ios
```

## 注意事项

- 请先准备好开发环境，Android需要准备Android Studio及Android Sdk，ios需要准备Mac及XCode
- 目前Android开发模式，参考的是`cordova-android`的逻辑，通过gradle编译，并启动模拟器/连接真机，再通过`adb`命令将开发包安装到目标机器上。
- IOS 开发模式还没有封装，使用的是默认命令`cap open ios`，需要手动完成后续步骤。
- 需要目标机器与当前机器处于同个局域网（因为要通过局域网IP访问web端）
- 目前build模式，全部都是走的`cap open ios/android`，需要手动完成打包。
- 如需要调试页面，

## Options

Configure in `.umirc.js`,

```js
export default {
  /* latter */
};
```

## TODO

- [ ] capacitor navive API调试
- [ ] IOS开发模式自动化

## LICENSE

MIT
