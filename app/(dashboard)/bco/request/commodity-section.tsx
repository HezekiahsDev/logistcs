//comodity-section
"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type Commodity = {
  id: string;
  type: string;
  weight: string;
  value: string;
  description: string;
};

interface CommoditySectionProps {
  commodities: Commodity[];
  setCommodities: (commodities: Commodity[]) => void;
}

export function CommoditySection({
  commodities,
  setCommodities,
}: CommoditySectionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const addCommodity = () => {
    const newCommodity: Commodity = {
      id: `commodity-${Date.now()}`,
      type: "",
      weight: "",
      value: "",
      description: "",
    };
    const newCommodities = [...commodities, newCommodity];
    setCommodities(newCommodities);

    // Expand the newly added item
    setExpandedItems([...expandedItems, newCommodity.id]);
  };

  const removeCommodity = (id: string) => {
    setCommodities(commodities.filter((commodity) => commodity.id !== id));
    setExpandedItems(expandedItems.filter((item) => item !== id));
  };

  const updateCommodity = (
    id: string,
    field: keyof Omit<Commodity, "id">,
    value: string
  ) => {
    setCommodities(
      commodities.map((commodity) => {
        if (commodity.id === id) {
          return { ...commodity, [field]: value };
        }
        return commodity;
      })
    );
  };

  const handleAccordionChange = (value: string[]) => {
    setExpandedItems(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Commodity Information</h3>
        <Button
          onClick={addCommodity}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Commodity
        </Button>
      </div>

      {commodities.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-md">
          <p className="text-muted-foreground mb-4">No commodities added yet</p>
          <Button
            onClick={addCommodity}
            variant="default"
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Your First Commodity
          </Button>
        </div>
      ) : (
        <Accordion
          type="multiple"
          value={expandedItems}
          onValueChange={handleAccordionChange}
          className="border rounded-md"
        >
          {commodities.map((commodity, index) => (
            <AccordionItem
              key={commodity.id}
              value={commodity.id}
              className="border-b last:border-b-0"
            >
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Commodity {index + 1}</span>
                    {commodity.type && (
                      <span className="text-sm text-muted-foreground">
                        - {commodity.type}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {commodity.weight && (
                      <span className="text-sm text-muted-foreground">
                        {commodity.weight} kg
                      </span>
                    )}
                    {commodity.value && (
                      <span className="text-sm text-muted-foreground">
                        ${commodity.value}
                      </span>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`commodity-type-${commodity.id}`}>
                      Commodity Type
                    </Label>
                    <Input
                      id={`commodity-type-${commodity.id}`}
                      placeholder="Select commodity type"
                      value={commodity.type}
                      onChange={(e) =>
                        updateCommodity(commodity.id, "type", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`weight-${commodity.id}`}>
                        Weight (kg)
                      </Label>
                      <Input
                        id={`weight-${commodity.id}`}
                        type="number"
                        placeholder="0.00"
                        value={commodity.weight}
                        onChange={(e) =>
                          updateCommodity(
                            commodity.id,
                            "weight",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`value-${commodity.id}`}>Value ($)</Label>
                      <Input
                        id={`value-${commodity.id}`}
                        type="number"
                        placeholder="0.00"
                        value={commodity.value}
                        onChange={(e) =>
                          updateCommodity(commodity.id, "value", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`commodity-description-${commodity.id}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`commodity-description-${commodity.id}`}
                      placeholder="Describe the commodity"
                      value={commodity.description}
                      onChange={(e) =>
                        updateCommodity(
                          commodity.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeCommodity(commodity.id)}
                      className="flex items-center gap-1"
                      disabled={commodities.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <div className="text-sm text-muted-foreground">
        {commodities.length > 0
          ? `Total commodities: ${commodities.length}`
          : "Add at least one commodity to continue"}
      </div>
    </div>
  );
}
