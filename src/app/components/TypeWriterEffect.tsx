import { useTypewriter } from '../custom_hooks/useTypewriter';

const TyperWriterEffect = ({ text, speed }: { text: string, speed: number }) => {
    const displayText = useTypewriter(text, speed);
  
    return <p className='border font-oxygen px-4 py-2 rounded-lg mb-2 w-full whitespace-pre-line text-justify'>{displayText}</p>;
  };
  
  export default TyperWriterEffect;