# Class: Wheel

Represents a wheel in a spin simulation.

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
| `parameters.physics` | [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md) |

#### Defined in

[Spinner/index.ts:185](https://github.com/daniellacosse/idea-spinner/blob/19933cb/packages/spinner/Spinner/index.ts#L185)

## Properties

### physics

• **physics**: [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md)

#### Defined in

[Spinner/index.ts:156](https://github.com/daniellacosse/idea-spinner/blob/19933cb/packages/spinner/Spinner/index.ts#L156)

___

### queue

• **queue**: [`ShuffleQueue`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/ShuffleQueue.md)<`string`\>

#### Defined in

[Spinner/index.ts:157](https://github.com/daniellacosse/idea-spinner/blob/19933cb/packages/spinner/Spinner/index.ts#L157)

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

[Spinner/index.ts:206](https://github.com/daniellacosse/idea-spinner/blob/19933cb/packages/spinner/Spinner/index.ts#L206)
