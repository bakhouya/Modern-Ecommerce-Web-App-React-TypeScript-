

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';

interface RichTextEditorProps {
  value: string;           // HTML string
  onChange: (html: string) => void;
  label?: string;
  error?: string;
}

export const RichTextEditor = ({ value, onChange, label, error }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || '<p></p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: `rich-text-editor ${error ? 'error' : ''}`,
      },
    },
  });

  // Synchroniser la valeur externe (ex: initialData) avec l'éditeur
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '<p></p>');
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div className="editor-toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}>Italic</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'active' : ''}>Liste</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'active' : ''}>Liste ordonnée</button>
        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>Tableau</button>
        <button onClick={() => {
          const url = window.prompt('URL du lien');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}>Lien</button>
        <button onClick={() => {
          const url = window.prompt('URL de l\'image');
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}>Image</button>
      </div>
      <EditorContent editor={editor} />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};













