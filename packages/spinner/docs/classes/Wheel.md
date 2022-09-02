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

[Spinner/index.ts:301](https://github.com/daniellacosse/idea-spinner/blob/8aef896/packages/spinner/Spinner/index.ts#L301)

## Properties

### name

• **name**: `string`

#### Defined in

[Spinner/index.ts:268](https://github.com/daniellacosse/idea-spinner/blob/8aef896/packages/spinner/Spinner/index.ts#L268)

___

### physics

• **physics**: [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md)

#### Defined in

[Spinner/index.ts:269](https://github.com/daniellacosse/idea-spinner/blob/8aef896/packages/spinner/Spinner/index.ts#L269)

___

### queue

• **queue**: [`ShuffleQueue`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/ShuffleQueue.md)<`T`\>

#### Defined in

[Spinner/index.ts:270](https://github.com/daniellacosse/idea-spinner/blob/8aef896/packages/spinner/Spinner/index.ts#L270)

## Accessors

### isSpinning

• `get` **isSpinning**(): `boolean`

Whether or not this Wheel is still spinning.

#### Returns

`boolean`

True or false.

#### Defined in

[Spinner/index.ts:330](https://github.com/daniellacosse/idea-spinner/blob/8aef896/packages/spinner/Spinner/index.ts#L330)

___

### value

• `get` **value**(): `T`

The currently selected value on the Wheel.

#### Returns

`T`

The current wheel value.

#### Defined in

[Spinner/index.ts:321](https://github.com/daniellacosse/idea-spinner/blob/8aef896/packages/spinner/Spinner/index.ts#L321)

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

[Spinner/index.ts:347](https://github.com/daniellacosse/idea-spinner/blob/8aef896/packages/spinner/Spinner/index.ts#L347)

___

### stop

▸ **stop**(): [`Wheel`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Wheel.md)<`T`\>

Immediately stops the wheel from spinning.

**`example`**
```js
wheel.stop();
```

#### Returns

[`Wheel`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Wheel.md)<`T`\>

This wheel, for utility.

#### Defined in

[Spinner/index.ts:378](https://github.com/daniellacosse/idea-spinner/blob/8aef896/packages/spinner/Spinner/index.ts#L378)
