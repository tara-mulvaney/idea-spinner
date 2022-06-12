# Class: Spinner

Simulates the spinning of a slot-machine-like object.
It can manage multiple spins simultaneously.

## Constructors

### constructor

• **new Spinner**(`parameters`)

The basic constructor.

**`example`**
```js
const spinner = new Spinner({ wheels:
  new Map([
    ["emotion", ["sad", "happy"]],
    ["color", ["red", "blue"]],
    ["length", ["long", "short"]]
  ])
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parameters` | `Object` |  |
| `parameters.wheels` | `Map`<`string`, `string`[]\> | The contents of each wheel in the spinner. |

#### Defined in

[Spinner/index.ts:37](https://github.com/daniellacosse/idea-spinner/blob/f8013b9/packages/spinner/Spinner/index.ts#L37)

## Properties

### parameters

• **parameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `wheels` | `Map`<`string`, `string`[]\> |

#### Defined in

[Spinner/index.ts:17](https://github.com/daniellacosse/idea-spinner/blob/f8013b9/packages/spinner/Spinner/index.ts#L17)

___

### spins

• **spins**: `Map`<`string`, [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)\>

#### Defined in

[Spinner/index.ts:18](https://github.com/daniellacosse/idea-spinner/blob/f8013b9/packages/spinner/Spinner/index.ts#L18)

## Methods

### advanceSpin

▸ **advanceSpin**(`spinID`, `time`): `void`

Advances a previously started spin.

**`example`**
```js
spinner.advanceSpin(spinID, 1000);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `spinID` | `string` | The ID of the spin you're polling. |
| `time` | `number` | How much further you're advancing the spinner. The units should be the same as those in the physics object. |

#### Returns

`void`

#### Defined in

[Spinner/index.ts:93](https://github.com/daniellacosse/idea-spinner/blob/f8013b9/packages/spinner/Spinner/index.ts#L93)

___

### createSpin

▸ **createSpin**(`physics`): `string`

Spins the spinner.

**`example`**
```js
const spinID = spinner.createSpin({
  startingFrameLength: 300,
  endingFrameLength: 600,
  friction: 0.5
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `physics` | [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md) | The `physics` parameters allow you to customize  the spacing between changes on the spinner. Note that the  units you use in this object will carry through the spin instance. |

#### Returns

`string`

The ID of the spin you've just started.

#### Defined in

[Spinner/index.ts:58](https://github.com/daniellacosse/idea-spinner/blob/f8013b9/packages/spinner/Spinner/index.ts#L58)

___

### getSpin

▸ **getSpin**(`spinID`): `undefined` \| [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)

Gets a previously started spin object.

**`example`**
```js
const spinObject = spinner.getSpin(spinID);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `spinID` | `string` |

#### Returns

`undefined` \| [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)

The Spin object.

#### Defined in

[Spinner/index.ts:77](https://github.com/daniellacosse/idea-spinner/blob/f8013b9/packages/spinner/Spinner/index.ts#L77)
