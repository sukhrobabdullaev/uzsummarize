"use client"

import type React from "react"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageExtraction } from "./ImageExtraction"
import { ImageDescription } from "./ImageDescription"

export function ImageSummarizer() {
    const [activeTab, setActiveTab] = useState<"text" | "description">("text")

    return (
        <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "text" | "description")}
            className="w-full"
        >
            <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="text">Extract Text</TabsTrigger>
                <TabsTrigger value="description">Get Description</TabsTrigger>
            </TabsList>

            {activeTab === "text" ? <ImageExtraction /> : <ImageDescription />}
        </Tabs>
    )
}
