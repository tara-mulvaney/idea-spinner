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

[Spinner/index.ts:39](https://github.com/daniellacosse/idea-spinner/blob/4cf8973/packages/spinner/Spinner/index.ts#L39)

## Properties

### parameters

• **parameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `wheels` | `Map`<`string`, `string`[]\> |

#### Defined in

[Spinner/index.ts:19](https://github.com/daniellacosse/idea-spinner/blob/4cf8973/packages/spinner/Spinner/index.ts#L19)

___

### spins

• **spins**: `Map`<`string`, [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)\>

#### Defined in

[Spinner/index.ts:20](https://github.com/daniellacosse/idea-spinner/blob/4cf8973/packages/spinner/Spinner/index.ts#L20)

## Methods

### getSpinStatus

▸ **getSpinStatus**(`spinID`, `timeOffset?`): `Optional`<{ `[wheelName: string]`: `string`;  }\>

Polls a previously started spin to see what it says.

**`example`**
```js
spinner.getSpinStatus(spinID, 1000);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `spinID` | `string` | The ID of the spin you're polling. |
| `timeOffset?` | `number` | You can optionally provide a  timeOffset to look into the future. |

#### Returns

`Optional`<{ `[wheelName: string]`: `string`;  }\>

What's shown on the Spinner at the current or future time.

#### Defined in

[Spinner/index.ts:80](https://github.com/daniellacosse/idea-spinner/blob/4cf8973/packages/spinner/Spinner/index.ts#L80)

___

### spin

▸ **spin**(`physics`): `string`

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

[Spinner/index.ts:59](https://github.com/daniellacosse/idea-spinner/blob/4cf8973/packages/spinner/Spinner/index.ts#L59)
