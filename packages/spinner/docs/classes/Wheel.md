# Class: Wheel<T\>

Represents a wheel in a spin simulation.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`WheelItem`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/README.md#wheelitem) |

## Constructors

### constructor

• **new Wheel**<`T`\>(`parameters`)

The basic constructor.

**`example`**
```js
const wheel = new Wheel({
  name: "my wheel",
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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`WheelItem`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/README.md#wheelitem) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Object` |
| `parameters.items` | `T`[] |
| `parameters.name` | `string` |
| `parameters.physics` | [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md) |

#### Defined in

[Spinner/index.ts:267](https://github.com/daniellacosse/idea-spinner/blob/bb5d477/packages/spinner/Spinner/index.ts#L267)

## Properties

### name

• **name**: `string`

#### Defined in

[Spinner/index.ts:234](https://github.com/daniellacosse/idea-spinner/blob/bb5d477/packages/spinner/Spinner/index.ts#L234)

___

### physics

• **physics**: [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md)

#### Defined in

[Spinner/index.ts:235](https://github.com/daniellacosse/idea-spinner/blob/bb5d477/packages/spinner/Spinner/index.ts#L235)

___

### queue

• **queue**: [`ShuffleQueue`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/ShuffleQueue.md)<`T`\>

#### Defined in

[Spinner/index.ts:236](https://github.com/daniellacosse/idea-spinner/blob/bb5d477/packages/spinner/Spinner/index.ts#L236)

## Accessors

### isSpinning

• `get` **isSpinning**(): `boolean`

Whether or not this Wheel is still spinning.

#### Returns

`boolean`

True or false.

#### Defined in

[Spinner/index.ts:296](https://github.com/daniellacosse/idea-spinner/blob/bb5d477/packages/spinner/Spinner/index.ts#L296)

___

### value

• `get` **value**(): `T`

The currently selected value on the Wheel.

#### Returns

`T`

The current wheel value.

#### Defined in

[Spinner/index.ts:287](https://github.com/daniellacosse/idea-spinner/blob/bb5d477/packages/spinner/Spinner/index.ts#L287)

## Methods

### advanceTime

▸ **advanceTime**(`time`): `undefined` \| [`Wheel`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Wheel.md)<`T`\>

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

`undefined` \| [`Wheel`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Wheel.md)<`T`\>

This wheel, for utility.

#### Defined in

[Spinner/index.ts:313](https://github.com/daniellacosse/idea-spinner/blob/bb5d477/packages/spinner/Spinner/index.ts#L313)

___

### unsafeForceValue

▸ **unsafeForceValue**(`value`): `void`

THIS IS NOT RECOMMENDED - forcing the wheel value can cause issues,
namely the shuffle queue will not know of this. Make sure you know
what you're doing.

**`example`**
```js
wheel.unsafeForceValue("something dumb");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value to set the wheel to. |

#### Returns

`void`

#### Defined in

[Spinner/index.ts:346](https://github.com/daniellacosse/idea-spinner/blob/bb5d477/packages/spinner/Spinner/index.ts#L346)
