interface EditorProps {
  children?: React.ReactNode;
}

export default function EditorLayout({ children }: EditorProps) {
  return (
    <div className="container justify-between mx-auto flex gap-10 py-8 pt-16">
      <div>side bar</div>
      {children}
    </div>
  );
}
