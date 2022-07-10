# Class: Wheel<T\>

Represents a wheel in a spin simulation.

## Type parameters

| Name |
| :------ |
| `T` |

## Constructors

### constructor

• **new Wheel**<`T`\>(`parameters`)

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

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Object` |
| `parameters.items` | `T`[] |
| `parameters.physics` | [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md) |

#### Defined in

[Spinner/index.ts:252](https://github.com/daniellacosse/idea-spinner/blob/0e5819d/packages/spinner/Spinner/index.ts#L252)

## Properties

### physics

• **physics**: [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md)

#### Defined in

[Spinner/index.ts:221](https://github.com/daniellacosse/idea-spinner/blob/0e5819d/packages/spinner/Spinner/index.ts#L221)

___

### queue

• **queue**: [`ShuffleQueue`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/ShuffleQueue.md)<`T`\>

#### Defined in

[Spinner/index.ts:222](https://github.com/daniellacosse/idea-spinner/blob/0e5819d/packages/spinner/Spinner/index.ts#L222)

## Accessors

### isSpinning

• `get` **isSpinning**(): `boolean`

Whether or not this Wheel is still spinning.

#### Returns

`boolean`

True or false.

#### Defined in

[Spinner/index.ts:276](https://github.com/daniellacosse/idea-spinner/blob/0e5819d/packages/spinner/Spinner/index.ts#L276)

___

### value

• `get` **value**(): `T`

The currently selected value on the Wheel.

#### Returns

`T`

The current wheel value.

#### Defined in

[Spinner/index.ts:267](https://github.com/daniellacosse/idea-spinner/blob/0e5819d/packages/spinner/Spinner/index.ts#L267)

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

[Spinner/index.ts:291](https://github.com/daniellacosse/idea-spinner/blob/0e5819d/packages/spinner/Spinner/index.ts#L291)
