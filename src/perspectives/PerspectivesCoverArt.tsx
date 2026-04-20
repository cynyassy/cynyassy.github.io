import childImg from '../assets/perspectives/cd423e6edd7a62e733a2afee3b263574d2df3c75.png';
import womanImg from '../assets/perspectives/b57fa03efae908dc0ffc9d2d8992cf3c0e8877fc.png';
import gentlemanImg from '../assets/perspectives/040a89687a081c8922d47ce01181afc7f12d47d4.png';
import farmerImg from '../assets/perspectives/d7eee63e5d931ab5ac6b52272cadaf9a9cf4e474.png';
import warriorImg from '../assets/perspectives/d85906c5d8d008bba43add9c5381ee61571a6a86.png';
import womanTwoImg from '../assets/perspectives/e826e353fcb4485e2a3b635dc69ea549647fd706.png';
import merchantImg from '../assets/perspectives/b46eb9962040937b7bb5d777b8bc3c297c7bc813.png';
import personImg from '../assets/perspectives/0c1c61e915ebb6398755b7be1c5bdd8a168d2009.png';
import sadPersonImg from '../assets/perspectives/d06de5a820cf872aff7d3184c713bba2e63c6c5a.png';
import kingImg from '../assets/perspectives/fd62593ed3a99dc48c1587c439fc5a0ee82e8ff2.png';

type PerspectivesCoverArtProps = {
  className?: string;
  compact?: boolean;
};

const topRow = [farmerImg, kingImg, womanImg, sadPersonImg, merchantImg];
const bottomRow = [personImg, womanTwoImg, childImg, warriorImg, gentlemanImg];

export function PerspectivesCoverArt({ className = '', compact = false }: PerspectivesCoverArtProps) {
  const titleClass = compact ? 'text-3xl md:text-4xl' : 'text-5xl md:text-6xl lg:text-7xl';
  const subtitleClass = compact ? 'text-sm md:text-base' : 'text-base md:text-xl';
  const smallTextClass = compact ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm';
  const topImageClass = compact ? 'h-11 w-11 md:h-14 md:w-14' : 'h-14 w-14 md:h-18 md:w-18 lg:h-20 lg:w-20';
  const sideImageClass = compact ? 'h-24 w-20 md:h-28 md:w-24' : 'h-32 w-28 md:h-40 md:w-32 lg:h-44 lg:w-36';
  const bottomImageClass = compact ? 'h-12 w-12 md:h-15 md:w-15' : 'h-16 w-16 md:h-20 md:w-20 lg:h-22 lg:w-22';

  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden border-4 border-black bg-white shadow-[10px_10px_0_0_rgba(0,0,0,1)] ${className}`}>
      <div className="absolute left-0 top-[33%] h-[30%] w-full rounded-r-[2.5rem] bg-[#ffdf00]" />

      <div className="relative z-10 flex h-full flex-col justify-between p-4 md:p-6">
        <div className="grid grid-cols-5 gap-2 md:gap-3">
          {topRow.map((src, index) => (
            <div key={index} className="flex items-end justify-center">
              <img src={src} alt="" className={`${topImageClass} object-contain`} aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:gap-6">
          <div className="space-y-1 md:space-y-2 text-black">
            <p className={`font-semibold tracking-[-0.05em] leading-[0.92] ${titleClass}`}>Perspectives</p>
            <div className={`font-medium leading-tight ${subtitleClass}`}>
              <p>Thesis Project</p>
              <p className="underline decoration-2 underline-offset-2">by Shashank “cynyassy” Sharma</p>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={gentlemanImg} alt="" className={`${sideImageClass} object-contain`} aria-hidden="true" />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 md:gap-3 items-end">
          {bottomRow.map((src, index) => (
            <div key={index} className="flex items-end justify-center">
              <img src={src} alt="" className={`${bottomImageClass} object-contain`} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 border-[3px] border-black" aria-hidden="true" />
      <p className="sr-only">Perspectives cover art with illustrated characters surrounding the title and thesis credit.</p>
      <div className={`absolute left-3 top-3 uppercase tracking-[0.24em] text-[#6b6b6b] ${smallTextClass}`} aria-hidden="true">
        Case Study
      </div>
    </div>
  );
}
