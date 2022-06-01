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

[Spinner/index.ts:215](https://github.com/daniellacosse/idea-spinner/blob/1c75d0a/packages/spinner/Spinner/index.ts#L215)

## Properties

### physics

• **physics**: [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md)

#### Defined in

[Spinner/index.ts:185](https://github.com/daniellacosse/idea-spinner/blob/1c75d0a/packages/spinner/Spinner/index.ts#L185)

___

### queue

• **queue**: [`ShuffleQueue`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/ShuffleQueue.md)<`string`\>

#### Defined in

[Spinner/index.ts:186](https://github.com/daniellacosse/idea-spinner/blob/1c75d0a/packages/spinner/Spinner/index.ts#L186)

## Accessors

### isSpinning

• `get` **isSpinning**(): `boolean`

Whether or not this Wheel is still spinning.

#### Returns

`boolean`

Whether or not this Wheel is still spinning.

#### Defined in

[Spinner/index.ts:239](https://github.com/daniellacosse/idea-spinner/blob/1c75d0a/packages/spinner/Spinner/index.ts#L239)

___

### value

• `get` **value**(): `string`

The currently selected value on the Wheel.

#### Returns

`string`

The currently selected value on the Wheel.

#### Defined in

[Spinner/index.ts:230](https://github.com/daniellacosse/idea-spinner/blob/1c75d0a/packages/spinner/Spinner/index.ts#L230)

## Methods

### advanceTime

▸ **advanceTime**(`time`): `void`

Get the current display of this wheel.

**`example`**
```js
wheel.getStatus(1000);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `time` | `number` | You can optionally provide an  advanceTime to advance the spinner into the future. |

#### Returns

`void`

The display of the Wheel at the current or future time.

#### Defined in

[Spinner/index.ts:255](https://github.com/daniellacosse/idea-spinner/blob/1c75d0a/packages/spinner/Spinner/index.ts#L255)
