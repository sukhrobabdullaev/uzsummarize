"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import ReactFlow, {
    type Node as FlowNode,
    type Edge as FlowEdge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Position,
    type ReactFlowInstance,
    Panel,
} from "reactflow"
import "reactflow/dist/style.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { toPng } from "html-to-image"
import Image from "next/image"
import { Download, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface MindmapNode {
    id: string
    title: string
    content: string
    parentId: string | null
    position: { x: number; y: number }
}

interface Mindmap {
    id: string
    title: string
    topic: string
    difficulty: string
    nodes: MindmapNode[]
}

interface CustomNodeData {
    label: string
    content: string
}

const nodeTypes = {
    mindmap: ({ data }: { data: CustomNodeData }) => (
        <div className="p-4 border rounded-xl bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 hover:shadow-xl min-w-[200px] backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border-slate-200 dark:border-slate-700">
            <div className="font-semibold text-lg text-slate-900 dark:text-slate-100">{data.label}</div>
            {data.content && <div className="text-sm mt-2 text-slate-600 dark:text-slate-300">{data.content}</div>}
        </div>
    ),
}

export function Mindmap() {
    const [topic, setTopic] = useState("")
    const [difficulty, setDifficulty] = useState("beginner")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [mindmap, setMindmap] = useState<Mindmap | null>(null)
    const [zoomLevel, setZoomLevel] = useState(1)

    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const flowRef = useRef<HTMLDivElement>(null)
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)

    const convertToFlowElements = useCallback(
        (mindmap: Mindmap) => {
            const flowNodes: FlowNode<CustomNodeData>[] = mindmap.nodes.map((node) => ({
                id: node.id,
                type: "mindmap",
                position: node.position,
                data: { label: node.title, content: node.content },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            }))

            const flowEdges: FlowEdge[] = mindmap.nodes
                .filter((node) => node.parentId)
                .map((node) => ({
                    id: `e${node.parentId}-${node.id}`,
                    source: node.parentId!,
                    target: node.id,
                    type: "smoothstep",
                    animated: true,
                    style: {
                        strokeWidth: 2,
                        stroke: "var(--slate-400)",
                    },
                }))

            setNodes(flowNodes)
            setEdges(flowEdges)
        },
        [setNodes, setEdges],
    )

    useEffect(() => {
        if (reactFlowInstance) {
            reactFlowInstance.zoomTo(zoomLevel)
        }
    }, [zoomLevel, reactFlowInstance])

    const handleGenerateMindmap = async () => {
        if (!topic) {
            setError("Iltimos, mavzuni kiriting")
            return
        }

        setLoading(true)
        setError("")

        try {
            const response = await fetch("/api/mindmap", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: `${topic} - Fikrlar xaritasi`, topic, difficulty }),
            })

            const data = await response.json()

            if (!response.ok) {
                if (response.status === 429) {
                    toast.error(data.error)
                    return
                }
                throw new Error(data.error || "Server xatosi")
            }

            setMindmap(data)
            convertToFlowElements(data)
        } catch (err) {
            console.error(err)
            setError("Xaritani yaratishda xatolik yuz berdi")
            toast.error("Xaritani yaratishda xatolik yuz berdi")
        } finally {
            setLoading(false)
        }
    }

    const handleExportImage = async () => {
        if (!mindmap || !flowRef.current) return

        const flowElement = flowRef.current.querySelector(".react-flow") as HTMLElement
        if (!flowElement) return

        try {
            setLoading(true)

            // Create a temporary container for the logo
            const logoContainer = document.createElement('div')
            logoContainer.style.position = 'absolute'
            logoContainer.style.top = '20px'
            logoContainer.style.right = '20px'
            logoContainer.style.zIndex = '1000'

            // Add the logo image
            const logo = document.createElement('img')
            logo.src = '/bg-logo.png'
            logo.style.objectFit = 'contain'
            logo.style.width = '200px'
            logo.style.height = '40px'
            logo.style.opacity = '0.7'
            logoContainer.appendChild(logo)

            // Temporarily append logo to flow element
            flowElement.appendChild(logoContainer)

            // Hide controls and panels temporarily
            const controls = flowElement.querySelector(".react-flow__controls") as HTMLElement
            const panels = flowElement.querySelectorAll(".react-flow__panel") as NodeListOf<HTMLElement>

            if (controls) controls.style.display = "none"
            panels.forEach((panel) => (panel.style.display = "none"))

            const dataUrl = await toPng(flowElement, {
                cacheBust: true,
                backgroundColor: "#ffffff",
                quality: 1,
                pixelRatio: 2,
            })

            // Create and trigger download
            const link = document.createElement("a")
            link.href = dataUrl
            link.download = `${mindmap.title.replace(/\s+/g, "_").toLowerCase()}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            // Cleanup: Remove temporary logo and restore controls/panels
            flowElement.removeChild(logoContainer)
            if (controls) controls.style.display = ""
            panels.forEach((panel) => (panel.style.display = ""))
        } catch (error) {
            console.error("Eksportda xatolik:", error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border border-slate-200 dark:border-slate-700 shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Fikrlar xaritasini yaratish
                    </CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400">
                        Mavzu va darajani tanlang, so'ng fikrlar xaritasini yarating
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
                            <Input
                                placeholder="Mavzu kiriting (masalan: 'Amir Temur', 'O'zbekiston tarixi', 'Python asoslari')"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full"
                            />
                            <Select value={difficulty} onValueChange={setDifficulty}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Darajani tanlang" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">Boshlang'ich</SelectItem>
                                    <SelectItem value="intermediate">O'rta</SelectItem>
                                    <SelectItem value="advanced">Yuqori</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={handleGenerateMindmap} disabled={loading} className="w-full md:w-auto">
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Yaratilmoqda...
                                    </>
                                ) : (
                                    "Yaratish"
                                )}
                            </Button>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                </CardContent>
            </Card>

            {mindmap && (
                <Card className="border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">{mindmap.title}</CardTitle>
                            <CardDescription>
                                {difficulty === "beginner" ? "Boshlang'ich" : difficulty === "intermediate" ? "O'rta" : "Yuqori"} daraja
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button onClick={handleExportImage} variant="outline" size="sm" disabled={loading}>
                                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                                <span className="hidden sm:inline">Rasm sifatida saqlash</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div ref={flowRef} className="h-[600px] border rounded-lg bg-white">
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                nodeTypes={nodeTypes}
                                onInit={setReactFlowInstance}
                                fitView
                                proOptions={{ hideAttribution: true }}
                            >
                                <Background color="#e5e5e5" />
                                <Controls />
                                <Panel position="top-right">
                                    <Image
                                        src="/bg-logo.png"
                                        className="absolute top-20 -left-20 z-50 opacity-70"
                                        alt="UzSummarize Logo"
                                        width={80}
                                        height={80}
                                        priority
                                    />
                                    <Button variant="outline" size="sm" onClick={() => reactFlowInstance?.fitView()}>
                                        Fit View
                                    </Button>
                                </Panel>
                            </ReactFlow>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
