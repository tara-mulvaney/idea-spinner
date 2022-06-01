# Class: Spinner

Simulates the spinning of a slot-machine-like object.
You can spin it multiple times simultaneously
 and poll for changes in real time.

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

[Spinner/index.ts:38](https://github.com/daniellacosse/idea-spinner/blob/29acf61/packages/spinner/Spinner/index.ts#L38)

## Properties

### parameters

• **parameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `wheels` | `Map`<`string`, `string`[]\> |

#### Defined in

[Spinner/index.ts:18](https://github.com/daniellacosse/idea-spinner/blob/29acf61/packages/spinner/Spinner/index.ts#L18)

___

### spins

• **spins**: `Map`<`string`, [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)\>

#### Defined in

[Spinner/index.ts:19](https://github.com/daniellacosse/idea-spinner/blob/29acf61/packages/spinner/Spinner/index.ts#L19)

## Methods

### advanceSpin

▸ **advanceSpin**(`spinID`, `time`): `void`

Polls a previously started spin to see what it says.

**`example`**
```js
spinner.advanceSpin(spinID, 1000);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `spinID` | `string` | The ID of the spin you're polling. |
| `time` | `number` | You can optionally provide a  advanceTime to look into the future. |

#### Returns

`void`

What's shown on the Spinner at the current or future time.

#### Defined in

[Spinner/index.ts:83](https://github.com/daniellacosse/idea-spinner/blob/29acf61/packages/spinner/Spinner/index.ts#L83)

___

### createSpin

▸ **createSpin**(`physics`): `string`

Spins the spinner.

**`example`**
```js
const spinID = spinner.spin({
  startingFrameLength: 300,
  endingFrameLength: 600,
  friction: 0.5
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `physics` | [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md) | The `physics` parameters allow you to customize  the time between ticks on the spinner. |

#### Returns

`string`

The ID of the spin you've just started.

#### Defined in

[Spinner/index.ts:58](https://github.com/daniellacosse/idea-spinner/blob/29acf61/packages/spinner/Spinner/index.ts#L58)

___

### getSpin

▸ **getSpin**(`spinID`): `undefined` \| [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `spinID` | `string` |

#### Returns

`undefined` \| [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)

#### Defined in

[Spinner/index.ts:66](https://github.com/daniellacosse/idea-spinner/blob/29acf61/packages/spinner/Spinner/index.ts#L66)
