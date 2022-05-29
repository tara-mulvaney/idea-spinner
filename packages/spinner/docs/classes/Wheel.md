[@idea-spinner/spinner](../README.md) / Wheel

# Class: Wheel

Represents a wheel in a spin simulation.

## Table of contents

### Constructors

- [constructor](Wheel.md#constructor)

### Properties

- [physics](Wheel.md#physics)
- [queue](Wheel.md#queue)

### Methods

- [getStatus](Wheel.md#getstatus)

## Constructors

### constructor

• **new Wheel**(`parameters`)

The basic constructor.

**`example`**
```js
const wheel = new Wheel({
  items: [
    "happy",
    "sad"
  ],
  physics: {
    startingFrameLength: 300,
    endingFrameLength: 600,
    friction: 0.5
  }
});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Object` |
| `parameters.items` | `string`[] |
| `parameters.physics` | [`SpinnerPhysics`](../interfaces/SpinnerPhysics.md) |

#### Defined in

[Spinner/index.ts:185](https://github.com/daniellacosse/idea-spinner/blob/811f418/packages/spinner/Spinner/index.ts#L185)

## Properties

### physics

• **physics**: [`SpinnerPhysics`](../interfaces/SpinnerPhysics.md)

#### Defined in

[Spinner/index.ts:156](https://github.com/daniellacosse/idea-spinner/blob/811f418/packages/spinner/Spinner/index.ts#L156)

___

### queue

• **queue**: [`ShuffleQueue`](ShuffleQueue.md)<`string`\>

#### Defined in

[Spinner/index.ts:157](https://github.com/daniellacosse/idea-spinner/blob/811f418/packages/spinner/Spinner/index.ts#L157)

## Methods

### getStatus

▸ **getStatus**(`timeOffset?`): `string`

Get the current display of this wheel.

**`example`**
```js
wheel.getStatus(1000);
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `timeOffset` | `number` | `0` | You can optionally provide a  timeOffset to look into the future. |

#### Returns

`string`

The display of the Wheel at the current or future time.

#### Defined in

[Spinner/index.ts:206](https://github.com/daniellacosse/idea-spinner/blob/811f418/packages/spinner/Spinner/index.ts#L206)
