import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";

const Tiptap = ({ input, setInput }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: input.description || "<p>Explain About Your Course</p>",
        onUpdate: ({ editor }) => {
            setInput(prev => ({
                ...prev,
                description: editor.getHTML(),
            }));
        }
    });


    useEffect(() => {
        if (!editor) return;

        if (editor.getHTML() !== input.description) {
            editor.commands.setContent(input.description);
        }
    }, [editor, input.description]);

    if (!editor) return null;

    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="flex dark:bg-gray-800 bg-[#8090a1] items-center gap-2 border-b p-2 bg-gray-50">
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className="px-2 py-1 cursor-pointer border rounded"
                >
                    Normal
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className="px-2 py-1 cursor-pointer border rounded"
                >
                    <b>B</b>
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className="px-2 py-1 border cursor-pointer rounded"
                >
                    <i>I</i>
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className="px-2 cursor-pointer py-1 border rounded"
                >
                    • List
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className="px-2 py-1 cursor-pointer border rounded"
                >
                    1. List
                </button>

                <button
                    onClick={() =>
                        editor.chain().focus().unsetAllMarks().clearNodes().run()
                    }
                    className="px-2 py-1 cursor-pointer border rounded"
                >
                    Clear Styling
                </button>

                <button
                    onClick={() =>
                        editor.chain().focus().clearContent().run()
                    }
                    className="px-2 py-1 cursor-pointer border rounded"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <EditorContent
                editor={editor}
                className="p-4 outline-none"
            />
        </div>
    );
};

export default Tiptap;