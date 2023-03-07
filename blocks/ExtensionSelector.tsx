import { Button, SelectPanel } from "@primer/react";
import { useState } from "react";
import { TriangleDownIcon } from "@primer/octicons-react";

const maximumExtensionsInList = 10;

interface ItemInput {
  id: string;
  text: string;
  showDivider?: boolean;
  disabled?: boolean;
}

export function ExtensionSelector({
  selectedExtensions,
  onSelectExtensions,
  availableKeys,
}: {
  selectedExtensions: string[];
  onSelectExtensions: (newExtensions: string[]) => void;
  availableKeys: string[];
}) {
  const [open, onOpenChange] = useState(false);

  const [filter, onFilterChange] = useState("");
  const availableItems: ItemInput[] = availableKeys.map((key) => ({
    text: key,
    id: key,
  }));
  const filteredItems = availableItems
    .filter((item) => item.text.toLowerCase().startsWith(filter.toLowerCase()))
    .slice(0, maximumExtensionsInList);
  const items = filteredItems.concat(
    availableItems.length > filteredItems.length
      ? [
          {
            text: `${
              availableItems.length - filteredItems.length
            } items hidden`,
            id: "hidden",
            showDivider: true,
            disabled: true,
          },
        ]
      : []
  );

  return (
    <SelectPanel
      renderAnchor={({
        children,
        "aria-labelledby": ariaLabelledBy,
        ...anchorProps
      }) => (
        <Button
          trailingAction={TriangleDownIcon}
          aria-labelledby={` ${ariaLabelledBy ?? ""}`}
          {...anchorProps}
        >
          {children || "Select file extensions"}
        </Button>
      )}
      placeholderText="Included file extensions"
      onOpenChange={onOpenChange}
      open={open}
      items={items}
      selected={availableItems.filter((item) =>
        selectedExtensions.includes(item.id)
      )}
      onFilterChange={onFilterChange}
      onSelectedChange={(
        items?:
          | { text?: string; id?: string | number }[]
          | { text?: string; id?: string | number }
      ) => {
        if (Array.isArray(items)) {
          onSelectExtensions(items.filter(hasId).map((item) => item.id));
          return;
        }
        onSelectExtensions(typeof items?.id !== "string" ? [] : [items.id]);
      }}
    />
  );
}

function hasId(val: unknown): val is { id: string } {
  return typeof (val as { id: unknown }).id === "string";
}
