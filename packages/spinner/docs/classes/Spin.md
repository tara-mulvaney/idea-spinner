# Class: Spin<T\>

An ongoing spin of a set of simulated wheels. Responsible
for handling the variance in physics across the wheels, if any.

## Type parameters

| Name |
| :------ |
| `T` |

## Constructors

### constructor

• **new Spin**<`T`\>(`parameters`)

The basic constructor.

**`example`**
```js
const spin = new Spin({
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

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Object` |
| `parameters.physics` | [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md) |
| `parameters.wheels` | [`WheelSet`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/README.md#wheelset)<`T`\> |

#### Defined in

[Spinner/index.ts:161](https://github.com/daniellacosse/idea-spinner/blob/af30666/packages/spinner/Spinner/index.ts#L161)

## Properties

### wheels

• **wheels**: `Map`<`string`, [`Wheel`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Wheel.md)<`T`\>\>

#### Defined in

[Spinner/index.ts:136](https://github.com/daniellacosse/idea-spinner/blob/af30666/packages/spinner/Spinner/index.ts#L136)

## Accessors

### isSpinning

• `get` **isSpinning**(): `boolean`

Whether or not the Spin object is still spinning.

#### Returns

`boolean`

True or false.

#### Defined in

[Spinner/index.ts:195](https://github.com/daniellacosse/idea-spinner/blob/af30666/packages/spinner/Spinner/index.ts#L195)

## Methods

### advanceTime

▸ **advanceTime**(`time`): `void`

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

`void`

#### Defined in

[Spinner/index.ts:210](https://github.com/daniellacosse/idea-spinner/blob/af30666/packages/spinner/Spinner/index.ts#L210)
