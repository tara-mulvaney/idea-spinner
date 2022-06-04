# Class: Spin

An ongoing spin of a set of simulated wheels. Responsible
for handling the variance in physics across the wheels.

## Constructors

### constructor

• **new Spin**(`parameters`)

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Object` |
| `parameters.physics` | [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md) |
| `parameters.wheels` | `Map`<`string`, `string`[]\> |

#### Defined in

[Spinner/index.ts:127](https://github.com/daniellacosse/idea-spinner/blob/6f19af5/packages/spinner/Spinner/index.ts#L127)

## Properties

### wheels

• **wheels**: `Map`<`string`, [`Wheel`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Wheel.md)\>

#### Defined in

[Spinner/index.ts:102](https://github.com/daniellacosse/idea-spinner/blob/6f19af5/packages/spinner/Spinner/index.ts#L102)

## Accessors

### isSpinning

• `get` **isSpinning**(): `boolean`

Whether or not the Spin object is still spinning.

#### Returns

`boolean`

Whether or not the Spin object is still spinning.

#### Defined in

[Spinner/index.ts:158](https://github.com/daniellacosse/idea-spinner/blob/6f19af5/packages/spinner/Spinner/index.ts#L158)

## Methods

### advanceTime

▸ **advanceTime**(`time`): `void`

Get the current display of this spin.

**`example`**
```js
spin.getStatus(1000);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `time` | `number` | You can optionally provide an  advanceTime to advance the spin into the future. |

#### Returns

`void`

The display of the Spin at the current or future time.

#### Defined in

[Spinner/index.ts:174](https://github.com/daniellacosse/idea-spinner/blob/6f19af5/packages/spinner/Spinner/index.ts#L174)
