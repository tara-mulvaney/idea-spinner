# Class: Spinner<T\>

Simulates the spinning of a slot-machine-like object.
It can manage multiple spins simultaneously.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`WheelItem`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/README.md#wheelitem) |

## Constructors

### constructor

• **new Spinner**<`T`\>(`parameters`)

The basic constructor.

**`example`**
```js
const spinner = new Spinner({ wheels:
  new Map([
    ["emotion", ["sad", "happy"]],
    ["color", ["red", { value: "blue", description: "the sad color" }]],
    ["length", ["long", "short"]]
  ])
});
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`WheelItem`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/README.md#wheelitem) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`SpinnerParameters`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerParameters.md)<`T`\> |

#### Defined in

[Spinner/index.ts:47](https://github.com/daniellacosse/idea-spinner/blob/1e68a8f/packages/spinner/Spinner/index.ts#L47)

## Properties

### parameters

• **parameters**: [`SpinnerParameters`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerParameters.md)<`T`\>

#### Defined in

[Spinner/index.ts:25](https://github.com/daniellacosse/idea-spinner/blob/1e68a8f/packages/spinner/Spinner/index.ts#L25)

___

### spins

• **spins**: `Map`<`string`, [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)<`T`\>\>

#### Defined in

[Spinner/index.ts:26](https://github.com/daniellacosse/idea-spinner/blob/1e68a8f/packages/spinner/Spinner/index.ts#L26)

## Methods

### advanceSpin

▸ **advanceSpin**(`spinID`, `time`): `undefined` \| [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)<`T`\>

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

`undefined` \| [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)<`T`\>

The advanced spin object, for utility.

#### Defined in

[Spinner/index.ts:121](https://github.com/daniellacosse/idea-spinner/blob/1e68a8f/packages/spinner/Spinner/index.ts#L121)

___

### createSpin

▸ **createSpin**(`physics?`): [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)<`T`\>

Spins the spinner.

**`throws`** {TypeError} Will throw if no physics object is found.

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
| `physics?` | [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md) | The `physics` parameters allow you to customize  the spacing between changes on the spinner. Note that the  units you use in this object will carry through the spin instance. |

#### Returns

[`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)<`T`\>

The spin you've just started.

#### Defined in

[Spinner/index.ts:71](https://github.com/daniellacosse/idea-spinner/blob/1e68a8f/packages/spinner/Spinner/index.ts#L71)

___

### getSpin

▸ **getSpin**(`spinID`): `undefined` \| [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)<`T`\>

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

`undefined` \| [`Spin`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/Spin.md)<`T`\>

The Spin object.

#### Defined in

[Spinner/index.ts:103](https://github.com/daniellacosse/idea-spinner/blob/1e68a8f/packages/spinner/Spinner/index.ts#L103)
