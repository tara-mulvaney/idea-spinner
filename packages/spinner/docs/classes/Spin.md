# Class: Spin<T\>

An ongoing spin of a set of simulated wheels. Responsible
for handling the variance in physics across the wheels, if any.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`WheelItem`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/README.md#wheelitem) |

## Constructors

### constructor

• **new Spin**<`T`\>(`parameters`)

The basic constructor.

**`example`**
```js
const spin = new Spin({
  id: "myID",
  wheels: new Map([
    ["emotion", ["sad", "happy"]],
    ["color", ["red", "blue"]],
    ["length", ["long", "short"]]
  ]),
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
| `parameters.id` | `string` |
| `parameters.physics` | [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md) |
| `parameters.wheels` | [`WheelSet`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/README.md#wheelset)<`T`\> |

#### Defined in

[Spinner/index.ts:164](https://github.com/daniellacosse/idea-spinner/blob/1e68a8f/packages/spinner/Spinner/index.ts#L164)

## Properties

### id

• **id**: `string`

#### Defined in

[Spinner/index.ts:136](https://github.com/daniellacosse/idea-spinner/blob/1e68a8f/packages/spinner/Spinner/index.ts#L136)

___

### wheels

• **wheels**: `Map`<`string`, [`Wheel`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Wheel.md)<`T`\>\>

#### Defined in

[Spinner/index.ts:137](https://github.com/daniellacosse/idea-spinner/blob/1e68a8f/packages/spinner/Spinner/index.ts#L137)

## Accessors

### isSpinning

• `get` **isSpinning**(): `boolean`

Whether or not the Spin object is still spinning.

#### Returns

`boolean`

True or false.

#### Defined in

[Spinner/index.ts:204](https://github.com/daniellacosse/idea-spinner/blob/1e68a8f/packages/spinner/Spinner/index.ts#L204)

## Methods

### advanceTime

▸ **advanceTime**(`time`): [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)<`T`\>

Advances the spin object.

**`example`**
```js
spin.advanceTime(1000);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `time` | `number` | How much further you're advancing the spinner. The units should be the same as those in the physics object. |

#### Returns

[`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)<`T`\>

The current spin object, for utility

#### Defined in

[Spinner/index.ts:221](https://github.com/daniellacosse/idea-spinner/blob/1e68a8f/packages/spinner/Spinner/index.ts#L221)
