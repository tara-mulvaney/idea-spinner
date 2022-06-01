# Class: ShuffleQueue<T\>

A queue of items from which the elements you take from it are randomly drawn.
Ensures you don't get the same element twice in a row.

## Type parameters

| Name |
| :------ |
| `T` |

## Constructors

### constructor

• **new ShuffleQueue**<`T`\>(`inventory?`)

The basic constructor.

**`example`**
```js
new ShuffleQueue(["item1", "item2", "item3"]);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `inventory` | `T`[] | `[]` | The inventory of elements to populate the queue. |

#### Defined in

[Spinner/ShuffleQueue/index.ts:20](https://github.com/daniellacosse/idea-spinner/blob/1c75d0a/packages/spinner/Spinner/ShuffleQueue/index.ts#L20)

## Accessors

### inventory

• `set` **inventory**(`inventory`): `void`

Replace the inventory of items in the queue.

#### Parameters

| Name | Type |
| :------ | :------ |
| `inventory` | `T`[] |

#### Returns

`void`

#### Defined in

[Spinner/ShuffleQueue/index.ts:51](https://github.com/daniellacosse/idea-spinner/blob/1c75d0a/packages/spinner/Spinner/ShuffleQueue/index.ts#L51)

___

### randomItem

• `get` **randomItem**(): `T`

Retrieves a random item from the queue.
If there are none left, reshuffles the queue and draws from the new list.

#### Returns

`T`

A random item from the queue.

#### Defined in

[Spinner/ShuffleQueue/index.ts:30](https://github.com/daniellacosse/idea-spinner/blob/1c75d0a/packages/spinner/Spinner/ShuffleQueue/index.ts#L30)
