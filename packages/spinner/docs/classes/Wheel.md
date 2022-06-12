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

[Spinner/index.ts:217](https://github.com/daniellacosse/idea-spinner/blob/169cdb9/packages/spinner/Spinner/index.ts#L217)

## Properties

### physics

• **physics**: [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md)

#### Defined in

[Spinner/index.ts:187](https://github.com/daniellacosse/idea-spinner/blob/169cdb9/packages/spinner/Spinner/index.ts#L187)

___

### queue

• **queue**: [`ShuffleQueue`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/ShuffleQueue.md)<`string`\>

#### Defined in

[Spinner/index.ts:188](https://github.com/daniellacosse/idea-spinner/blob/169cdb9/packages/spinner/Spinner/index.ts#L188)

## Accessors

### isSpinning

• `get` **isSpinning**(): `boolean`

Whether or not this Wheel is still spinning.

#### Returns

`boolean`

True or false.

#### Defined in

[Spinner/index.ts:241](https://github.com/daniellacosse/idea-spinner/blob/169cdb9/packages/spinner/Spinner/index.ts#L241)

___

### value

• `get` **value**(): `string`

The currently selected value on the Wheel.

#### Returns

`string`

The current message.

#### Defined in

[Spinner/index.ts:232](https://github.com/daniellacosse/idea-spinner/blob/169cdb9/packages/spinner/Spinner/index.ts#L232)

## Methods

### advanceTime

▸ **advanceTime**(`time`): `void`

Advances the wheel forward in the simulation.

**`example`**
```js
wheel.advanceTime(1000);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `time` | `number` | How much further the wheel is being advanced. The units should be the same as those in the physics object. |

#### Returns

`void`

#### Defined in

[Spinner/index.ts:256](https://github.com/daniellacosse/idea-spinner/blob/169cdb9/packages/spinner/Spinner/index.ts#L256)
