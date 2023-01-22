# Accordion 手风琴

### 介绍

通过折叠收纳内容，允许同时展开一个或多个。

### 引入

```js
import { Accordion } from 'sard'
```

## 代码演示

<code src="./demo/Basic.tsx"></code>
<code src="./demo/DefaultActiveName.tsx"></code>
<code src="./demo/Multiple.tsx"></code>
<code src="./demo/Controlled.tsx"></code>
<code src="./demo/Disabled.tsx"></code>
<code src="./demo/Slot.tsx"></code>
<code src="./demo/Duration.tsx"></code>

## API

### Accordion Props

| 属性             | 描述                    | 类型                                                          | 默认值 |
| ---------------- | ----------------------- | ------------------------------------------------------------- | ------ |
| duration         | 展开折叠缓动时间        | number                                                        | -      |
| multiple         | 是否可同时展开多个      | boolean                                                       | false  |
| defaultActiveKey | 初始化选中面板的 key    | string \| number \| (string \| number)[]                      | -      |
| activeKey        | 当前激活 tab 面板的 key | string \| number \| (string \| number)[]                      | -      |
| onChange         | 切换面板的回调          | (activeKey: string \| number \| (string \| number)[]) => void | -      |

### AccordionItem Props

| 属性     | 描述             | 类型                                                      | 默认值 |
| -------- | ---------------- | --------------------------------------------------------- | ------ |
| title    | 面板标题         | React.ReactNode                                           | -      |
| icon     | 面板右侧图标     | React.ReactNode \| ((active: boolean) => React.ReactNode) | -      |
| key      | 对应 activeKey   | string \| number                                          | -      |
| disabled | 禁用面板         | boolean                                                   | -      |
| duration | 展开折叠缓动时间 | number                                                    | 300    |
| onClick  | 点击面板头部触发 | () => void                                                | -      |

## 主题定制

### SCSS

```scss
$s-accordion-border-color: $s-border-color !default;
$s-accordion-border-radius: $s-border-radius !default;

$s-accordion-item-header-padding: 10px 15px !default;
$s-accordion-item-title-font-size: $s-font-size !default;
$s-accordion-item-arrow-transition-duration: 300ms !default;
$s-accordion-item-content-padding: 10px 15px 15px !default;
```
