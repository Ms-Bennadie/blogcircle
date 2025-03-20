
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bold, Italic, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, Quote, Heading1, Heading2,
  Type, 
} from 'lucide-react';

type RichTextEditorProps = {
  initialContent?: string;
  onChange: (content: string) => void;
  placeholder?: string;
};

const RichTextEditor = ({ 
  initialContent = '', 
  onChange,
  placeholder = 'Start writing your post here...' 
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Initialize editor with initial content
  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  // Handle content changes
  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Command functions for formatting
  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    handleContentChange();
    editorRef.current?.focus();
  };

  const formatBlock = (block: string) => {
    execCommand('formatBlock', block);
  };

  return (
    <div className="space-y-2 w-full">
      {/* Toolbar */}
      <div className={`flex flex-wrap gap-1 p-1 border rounded-md transition-all ${
        isFocused ? 'border-foreground/30' : 'border-border'
      }`}>
        {/* Text Style */}
        <Button
          variant="ghost"
          size="sm"
          title="Normal text"
          onClick={() => formatBlock('p')}
          className="h-8 px-2"
        >
          <Type size={15} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Heading 1"
          onClick={() => formatBlock('h1')}
          className="h-8 px-2"
        >
          <Heading1 size={15} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Heading 2"
          onClick={() => formatBlock('h2')}
          className="h-8 px-2"
        >
          <Heading2 size={15} />
        </Button>

        <div className="h-6 mx-1 my-auto border-l border-border" />

        {/* Basic Formatting */}
        <Button
          variant="ghost"
          size="sm"
          title="Bold"
          onClick={() => execCommand('bold')}
          className="h-8 px-2"
        >
          <Bold size={15} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Italic"
          onClick={() => execCommand('italic')}
          className="h-8 px-2"
        >
          <Italic size={15} />
        </Button>

        <div className="h-6 mx-1 my-auto border-l border-border" />

        {/* Lists */}
        <Button
          variant="ghost"
          size="sm"
          title="Bulleted List"
          onClick={() => execCommand('insertUnorderedList')}
          className="h-8 px-2"
        >
          <List size={15} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Numbered List"
          onClick={() => execCommand('insertOrderedList')}
          className="h-8 px-2"
        >
          <ListOrdered size={15} />
        </Button>
        
        <div className="h-6 mx-1 my-auto border-l border-border" />

        {/* Alignment */}
        <Button
          variant="ghost"
          size="sm"
          title="Align Left"
          onClick={() => execCommand('justifyLeft')}
          className="h-8 px-2"
        >
          <AlignLeft size={15} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Align Center"
          onClick={() => execCommand('justifyCenter')}
          className="h-8 px-2"
        >
          <AlignCenter size={15} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Align Right"
          onClick={() => execCommand('justifyRight')}
          className="h-8 px-2"
        >
          <AlignRight size={15} />
        </Button>

        <div className="h-6 mx-1 my-auto border-l border-border" />

        {/* Blockquote */}
        <Button
          variant="ghost"
          size="sm"
          title="Blockquote"
          onClick={() => formatBlock('blockquote')}
          className="h-8 px-2"
        >
          <Quote size={15} />
        </Button>
      </div>

      {/* Editable Content Area */}
      <div
        ref={editorRef}
        className={`rich-text-editor w-full transition-all duration-200 ${
          isFocused ? 'ring-2 ring-foreground/10' : ''
        }`}
        contentEditable
        onInput={handleContentChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        dangerouslySetInnerHTML={{ __html: initialContent || '' }}
        data-placeholder={placeholder}
        aria-label="Rich text editor"
      />
    </div>
  );
};

export default RichTextEditor;
