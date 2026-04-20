import farmerImg from 'figma:asset/d7eee63e5d931ab5ac6b52272cadaf9a9cf4e474.png';
import kingImg from 'figma:asset/fd62593ed3a99dc48c1587c439fc5a0ee82e8ff2.png';
import womanImg from 'figma:asset/b57fa03efae908dc0ffc9d2d8992cf3c0e8877fc.png';
import childImg from 'figma:asset/cd423e6edd7a62e733a2afee3b263574d2df3c75.png';
import gentlemanImg from 'figma:asset/040a89687a081c8922d47ce01181afc7f12d47d4.png';
import merchantImg from 'figma:asset/b46eb9962040937b7bb5d777b8bc3c297c7bc813.png';
import woman2Img from 'figma:asset/e826e353fcb4485e2a3b635dc69ea549647fd706.png';
import personImg from 'figma:asset/0c1c61e915ebb6398755b7be1c5bdd8a168d2009.png';
import warriorImg from 'figma:asset/d85906c5d8d008bba43add9c5381ee61571a6a86.png';
import sadPersonImg from 'figma:asset/d06de5a820cf872aff7d3184c713bba2e63c6c5a.png';

export function GameNarrative() {
  return (
    <section className="px-6 py-24 border-b border-black bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="space-y-4">
          <div className="bg-[#ffdf00] border-4 border-black rounded-full px-8 py-4 inline-block">
            <h2 className="text-5xl font-black">The Lore of DOMINATION</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            The game opens with a foundational narrative that sets the stage for understanding how systems of domination and privilege evolve over generations.
          </p>
        </div>

        {/* Beginning - Diverse Communities */}
        <div className="space-y-4">
          <p className="text-xl leading-relaxed">
            Once upon a time, there was a land with many different communities living within it. Each community had its own unique culture, language, and way of life. Some communities were small and isolated, while others were large and influential.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <img src={childImg} alt="Child character" className="w-20 h-20 object-contain" />
            <img src={womanImg} alt="Woman character" className="w-20 h-20 object-contain" />
            <img src={gentlemanImg} alt="Gentleman character" className="w-20 h-20 object-contain" />
            <img src={farmerImg} alt="Farmer character" className="w-20 h-20 object-contain" />
          </div>
        </div>

        {/* Interaction and Trade */}
        <div className="space-y-4">
          <p className="text-xl leading-relaxed">
            Over time, the communities began to interact with one another more and more. They traded goods and ideas, formed alliances, and sometimes even went to war with one another. As the interactions between the communities increased, so too did the disparities between them.
          </p>
        </div>

        {/* Resource Accumulation */}
        <div className="space-y-4">
          <p className="text-xl leading-relaxed">
            Some communities were able to accumulate resources and power more easily than others. They had access to fertile land, abundant natural resources, and favorable trade routes. Other communities, however, were not so lucky. They struggled to survive in harsh environments, lacked access to basic resources, and were often exploited by more powerful communities.
          </p>
        </div>

        {/* Entrenched Systems */}
        <div className="space-y-4">
          <p className="text-xl leading-relaxed">
            As time went on, the disparities between the communities became more and more entrenched. The communities with more resources and power were able to maintain their advantages, while those with less were unable to catch up. The communities with more power also began to create systems to maintain their advantages, passing laws and creating institutions that reinforced their dominance.
          </p>
        </div>

        {/* Social and Geographic Determinism */}
        <div className="border-l-4 border-[#FF6B6B] pl-6 space-y-6">
          <p className="text-xl leading-relaxed">
            Eventually, these systems became so entrenched that they were seen as natural and inevitable. The communities with more power were able to maintain their advantages without even having to try, while those with less were trapped in a cycle of poverty and disadvantage. This was known as <span className="font-bold bg-[#FF6B6B] bg-opacity-20 px-2">social determinism</span>.
          </p>
          <p className="text-xl leading-relaxed">
            At the same time, the geography of the land also played a role in determining which communities had access to resources and power. Some communities were located in areas with abundant natural resources and favorable climates, while others were located in harsh environments with little access to resources. Over time, the communities in more favorable locations were able to accumulate more resources and power, while those in less favorable locations fell behind. This was known as <span className="font-bold bg-[#FF6B6B] bg-opacity-20 px-2">geographic determinism</span>.
          </p>
        </div>

        {/* Discrimination and Exploitation */}
        <div className="space-y-4">
          <p className="text-xl leading-relaxed">
            Once the disparities between the communities became more entrenched, the communities with more resources and power began to create systems to maintain their advantages. They passed laws and created institutions that reinforced their dominance over the communities with less resources and power. The communities with more power also began to look down upon the communities with less, viewing them as inferior and lazy. This led to discrimination and marginalization of the less powerful communities.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <img src={warriorImg} alt="Warrior character" className="w-20 h-20 object-contain" />
            <img src={woman2Img} alt="Woman character" className="w-20 h-20 object-contain" />
          </div>
        </div>

        {/* Cycle of Exploitation */}
        <div className="space-y-6 bg-white border-2 border-black p-8">
          <p className="text-xl leading-relaxed">
            As time went on, the communities with more power began to manipulate and exploit the less powerful communities for their own gain. They took advantage of their labor and resources, and used their power to deny them basic rights and opportunities. This created a cycle of poverty and disadvantage that was difficult to escape from.
          </p>
          <p className="text-xl leading-relaxed">
            The communities with more power also created myths and stereotypes about the less powerful communities, portraying them as lazy, criminal, or unintelligent. These myths and stereotypes helped to justify their discrimination and exploitation, and made it difficult for the less powerful communities to challenge the systems that were keeping them down.
          </p>
        </div>
      </div>
    </section>
  );
}