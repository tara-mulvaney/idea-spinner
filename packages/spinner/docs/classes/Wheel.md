# Class: Wheel

Represents a wheel in a spin simulation.

## Constructors

### constructor

• **new Wheel**(`parameters`)

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | `Object` |
| `parameters.items` | `string`[] |
| `parameters.physics` | [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md) |

#### Defined in

[Spinner/index.ts:199](https://github.com/daniellacosse/idea-spinner/blob/29acf61/packages/spinner/Spinner/index.ts#L199)

## Properties

### physics

• **physics**: [`SpinnerPhysics`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/interfaces/SpinnerPhysics.md)

#### Defined in

[Spinner/index.ts:169](https://github.com/daniellacosse/idea-spinner/blob/29acf61/packages/spinner/Spinner/index.ts#L169)

___

### queue

• **queue**: [`ShuffleQueue`](https://github.com/daniellacosse/idea-spinner/tree/main/packages/spinner/docs/classes/ShuffleQueue.md)<`string`\>

#### Defined in

[Spinner/index.ts:170](https://github.com/daniellacosse/idea-spinner/blob/29acf61/packages/spinner/Spinner/index.ts#L170)

## Accessors

### isSpinning

• `get` **isSpinning**(): `boolean`

#### Returns

`boolean`

#### Defined in

[Spinner/index.ts:213](https://github.com/daniellacosse/idea-spinner/blob/29acf61/packages/spinner/Spinner/index.ts#L213)

___

### value

• `get` **value**(): `string`

#### Returns

`string`

#### Defined in

[Spinner/index.ts:209](https://github.com/daniellacosse/idea-spinner/blob/29acf61/packages/spinner/Spinner/index.ts#L209)

## Methods

### advanceTime

▸ **advanceTime**(`time`): `void`

Get the current display of this wheel.

**`example`**
```js
wheel.getStatus(1000);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `time` | `number` | You can optionally provide an  advanceTime to advance the spinner into the future. |

#### Returns

`void`

The display of the Wheel at the current or future time.

#### Defined in

[Spinner/index.ts:229](https://github.com/daniellacosse/idea-spinner/blob/29acf61/packages/spinner/Spinner/index.ts#L229)
