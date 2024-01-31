/** @format */
import * as Tabs from '@radix-ui/react-tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../@/components/ui/accordion'

//Mobile Layout component
const MobileAboutContent = () => {
  const trigger_style =
    'formadjr pl-[1rem] text-white text-2xl data-[state=inactive]: data-[state=inactive]: data-[state=inactive]:text-slate-300 '

  return (
    <AccordionItem value="about">
      <AccordionTrigger chevron="false" className={trigger_style}>
        <span>About</span>
      </AccordionTrigger>
      <AccordionContent>
        <p className="px-2 pl-[1rem] inclusive text-white">
          Irure aliquip in in nisi excepteur sunt aliqua labore laborum tempor
          quis duis magna. Culpa adipisicing deserunt esse minim irure pariatur
          dolor. Et nulla et duis nostrud consequat consectetur mollit fugiat
          cillum id nisi. Sit nisi eiusmod ullamco laborum ipsum cupidatat
          consequat. Amet tempor dolore elit nisi aliquip. Reprehenderit fugiat
          officia voluptate eiusmod culpa sint reprehenderit eu minim ullamco
          adipisicing deserunt reprehenderit. Qui non quis incididunt velit sunt
          sunt aliquip incididunt sit culpa nostrud est id. Velit consectetur
          anim deserunt aute excepteur laboris anim qui. Adipisicing ad
          excepteur dolore laboris cillum laborum qui ipsum nulla exercitation
          magna commodo. Laboris eu consectetur voluptate elit ex est et dolor
          commodo ex duis elit amet aliqua. Deserunt ad ex nisi irure
          exercitation minim magna. Ipsum cillum laboris quis minim et quis
          laborum.
        </p>
      </AccordionContent>
    </AccordionItem>
  )
}
const MobileValuesContent = () => {
  const trigger_style =
    'formadjr pl-[1rem] text-white text-2xl data-[state=inactive]: data-[state=inactive]: data-[state=inactive]:text-slate-300 '

  return (
    <AccordionItem value="values" className="">
      <AccordionTrigger chevron="false" className={trigger_style}>
        <span>Values</span>
      </AccordionTrigger>
      <AccordionContent>
        <p className="px-2 pl-[1rem] inclusive text-white">
          Irure aliquip in in nisi excepteur sunt aliqua labore laborum tempor
          quis duis magna. Culpa adipisicing deserunt esse minim irure pariatur
          dolor. Et nulla et duis nostrud consequat consectetur mollit fugiat
          cillum id nisi. Sit nisi eiusmod ullamco laborum ipsum cupidatat
          consequat. Amet tempor dolore elit nisi aliquip. Reprehenderit fugiat
          officia voluptate eiusmod culpa sint reprehenderit eu minim ullamco
          adipisicing deserunt reprehenderit. Qui non quis incididunt velit sunt
          sunt aliquip incididunt sit culpa nostrud est id. Velit consectetur
          anim deserunt aute excepteur laboris anim qui. Adipisicing ad
          excepteur dolore laboris cillum laborum qui ipsum nulla exercitation
          magna commodo. Laboris eu consectetur voluptate elit ex est et dolor
          commodo ex duis elit amet aliqua. Deserunt ad ex nisi irure
          exercitation minim magna. Ipsum cillum laboris quis minim et quis
          laborum.
        </p>
      </AccordionContent>
    </AccordionItem>
  )
}
const MobilePartnershipContent = () => {
  const trigger_style =
    'formadjr pl-[1rem] text-white text-2xl data-[state=inactive]: data-[state=inactive]: data-[state=inactive]:text-slate-300 '

  return (
    <AccordionItem value="partenrship" className="">
      <AccordionTrigger chevron="false" className={trigger_style}>
        <span>Partnership</span>
      </AccordionTrigger>
      <AccordionContent>
        <p className="px-2 pl-[1rem] inclusive text-white">
          Irure aliquip in in nisi excepteur sunt aliqua labore laborum tempor
          quis duis magna. Culpa adipisicing deserunt esse minim irure pariatur
          dolor. Et nulla et duis nostrud consequat consectetur mollit fugiat
          cillum id nisi. Sit nisi eiusmod ullamco laborum ipsum cupidatat
          consequat. Amet tempor dolore elit nisi aliquip. Reprehenderit fugiat
          officia voluptate eiusmod culpa sint reprehenderit eu minim ullamco
          adipisicing deserunt reprehenderit. Qui non quis incididunt velit sunt
          sunt aliquip incididunt sit culpa nostrud est id. Velit consectetur
          anim deserunt aute excepteur laboris anim qui. Adipisicing ad
          excepteur dolore laboris cillum laborum qui ipsum nulla exercitation
          magna commodo. Laboris eu consectetur voluptate elit ex est et dolor
          commodo ex duis elit amet aliqua. Deserunt ad ex nisi irure
          exercitation minim magna. Ipsum cillum laboris quis minim et quis
          laborum.
        </p>
      </AccordionContent>
    </AccordionItem>
  )
}
const MobileVolunteerContent = () => {
  const trigger_style =
    'formadjr pl-[1rem] text-white text-2xl data-[state=inactive]: data-[state=inactive]: data-[state=inactive]:text-slate-300 '

  return (
    <AccordionItem value="volunteer" className="">
      <AccordionTrigger chevron="false" className={trigger_style}>
        <span>Volunteering</span>
      </AccordionTrigger>
      <AccordionContent>
        <p className="px-2 pl-[1rem] inclusive text-white">
          Irure aliquip in in nisi excepteur sunt aliqua labore laborum tempor
          quis duis magna. Culpa adipisicing deserunt esse minim irure pariatur
          dolor. Et nulla et duis nostrud consequat consectetur mollit fugiat
          cillum id nisi. Sit nisi eiusmod ullamco laborum ipsum cupidatat
          consequat. Amet tempor dolore elit nisi aliquip. Reprehenderit fugiat
          officia voluptate eiusmod culpa sint reprehenderit eu minim ullamco
          adipisicing deserunt reprehenderit. Qui non quis incididunt velit sunt
          sunt aliquip incididunt sit culpa nostrud est id. Velit consectetur
          anim deserunt aute excepteur laboris anim qui. Adipisicing ad
          excepteur dolore laboris cillum laborum qui ipsum nulla exercitation
          magna commodo. Laboris eu consectetur voluptate elit ex est et dolor
          commodo ex duis elit amet aliqua. Deserunt ad ex nisi irure
          exercitation minim magna. Ipsum cillum laboris quis minim et quis
          laborum.
        </p>
      </AccordionContent>
    </AccordionItem>
  )
}
const MobileContactContent = () => {
  const trigger_style =
    'formadjr pl-[1rem] text-white text-2xl data-[state=inactive]: data-[state=inactive]: data-[state=inactive]:text-slate-300 '

  return (
    <AccordionItem value="contact" className="">
      <AccordionTrigger chevron="false" className={trigger_style}>
        <span>Contact</span>
      </AccordionTrigger>
      <AccordionContent>
        <p className="px-2 pl-[1rem] inclusive text-white">
          Irure aliquip in in nisi excepteur sunt aliqua labore laborum tempor
          quis duis magna. Culpa adipisicing deserunt esse minim irure pariatur
          dolor. Et nulla et duis nostrud consequat consectetur mollit fugiat
          cillum id nisi. Sit nisi eiusmod ullamco laborum ipsum cupidatat
          consequat. Amet tempor dolore elit nisi aliquip. Reprehenderit fugiat
          officia voluptate eiusmod culpa sint reprehenderit eu minim ullamco
          adipisicing deserunt reprehenderit. Qui non quis incididunt velit sunt
          sunt aliquip incididunt sit culpa nostrud est id. Velit consectetur
          anim deserunt aute excepteur laboris anim qui. Adipisicing ad
          excepteur dolore laboris cillum laborum qui ipsum nulla exercitation
          magna commodo. Laboris eu consectetur voluptate elit ex est et dolor
          commodo ex duis elit amet aliqua. Deserunt ad ex nisi irure
          exercitation minim magna. Ipsum cillum laboris quis minim et quis
          laborum.
        </p>
      </AccordionContent>
    </AccordionItem>
  )
}
const MobileContent = () => {
  return (
    <div className="mt-[5rem] w-screen px-2 md:hidden">
      <Accordion
        type="single"
        collapsible
        className="min-w-full border-[1px] border-b-0 border-white"
      >
        <MobileAboutContent />
        <MobileValuesContent />
        <MobilePartnershipContent />
        <MobileVolunteerContent />
        <MobileContactContent />
      </Accordion>
    </div>
  )
}

//Desktop layout component
const Windows = () => {
  const COMMUN_STYLES =
    'formadjr text-2xl w-[10rem] h-1/5 data-[state=inactive]:border-r-[1px] data-[state=inactive]:border-r-white data-[state=inactive]:text-slate-300'

  return (
    <Tabs.List className=" flex flex-col w-fit min-h-full justify-between ">
      <Tabs.Trigger value="about" className={`${COMMUN_STYLES} border-b-[1px]`}>
        About
      </Tabs.Trigger>
      <Tabs.Trigger
        value="values"
        className={`${COMMUN_STYLES} border-b-[1px]`}
      >
        Values
      </Tabs.Trigger>
      <Tabs.Trigger
        value="partnership"
        className={`${COMMUN_STYLES} border-b-[1px]`}
      >
        Partnership
      </Tabs.Trigger>
      <Tabs.Trigger
        value="volunteer"
        className={`${COMMUN_STYLES} border-b-[1px]`}
      >
        Volunteer
      </Tabs.Trigger>
      <Tabs.Trigger value="contact" className={`${COMMUN_STYLES} `}>
        Contact
      </Tabs.Trigger>
    </Tabs.List>
  )
}
const ContentWrapper = ({children, value}) => {
  const style = 'p-10 overflow-scroll'

  return (
    <Tabs.Content value={value} className={style}>
      {children}
    </Tabs.Content>
  )
}
const AboutContent = () => {
  return (
    <ContentWrapper value="about">
      <p className="inclusive">
        Qui veniam proident sit elit eiusmod tempor culpa. Fugiat elit sint
        magna labore velit. Anim dolore veniam veniam dolor laboris enim
        ullamco. Ad duis culpa dolor duis commodo commodo eu non ullamco qui
        dolore commodo. Nostrud aliqua do commodo deserunt qui sunt exercitation
        pariatur irure reprehenderit nostrud aute dolor. In anim commodo sit
        pariatur sint occaecat ex nulla fugiat reprehenderit deserunt.
        Incididunt commodo reprehenderit dolore occaecat voluptate quis dolor
        veniam consectetur excepteur non dolor. Dolore ullamco aute eiusmod
        adipisicing incididunt fugiat ullamco et et sunt. Fugiat elit officia
        sunt irure et. Consectetur labore ex duis occaecat nisi sint veniam
        mollit proident. Nostrud proident dolore proident laboris. Do do
        pariatur sunt enim non qui amet voluptate. Officia eiusmod quis eu irure
        et tempor qui cupidatat aliqua commodo voluptate aliquip duis excepteur.
        Commodo tempor excepteur anim quis et ipsum. Labore reprehenderit ad
        aliquip deserunt commodo incididunt fugiat veniam in ullamco culpa
        fugiat eu. Lorem pariatur ex officia non quis nostrud adipisicing velit
        dolore nostrud aliqua. Eu adipisicing amet incididunt nisi qui. Sit
        consectetur ut voluptate Lorem sunt tempor laboris consequat consequat.
        Qui veniam veniam quis aliquip sint est deserunt nostrud. Ex voluptate
        anim mollit sit exercitation. Exercitation pariatur aute amet enim irure
        nulla elit pariatur aliqua minim. Adipisicing eiusmod non ut laborum
        consectetur ut ad occaecat aute incididunt dolore. Laborum deserunt amet
        ut sint cillum labore officia ut dolore quis tempor.
      </p>
    </ContentWrapper>
  )
}
const ValuesContent = () => {
  return (
    <ContentWrapper value="values">
      <p className="inclusive">
        Qui veniam proident sit elit eiusmod tempor culpa. Fugiat elit sint
        magna labore velit. Anim dolore veniam veniam dolor laboris enim
        ullamco. Ad duis culpa dolor duis commodo commodo eu non ullamco qui
        dolore commodo. Nostrud aliqua do commodo deserunt qui sunt exercitation
        pariatur irure reprehenderit nostrud aute dolor. In anim commodo sit
        pariatur sint occaecat ex nulla fugiat reprehenderit deserunt.
        Incididunt commodo reprehenderit dolore occaecat voluptate quis dolor
        veniam consectetur excepteur non dolor. Dolore ullamco aute eiusmod
        adipisicing incididunt fugiat ullamco et et sunt. Fugiat elit officia
        sunt irure et. Consectetur labore ex duis occaecat nisi sint veniam
        mollit proident. Nostrud proident dolore proident laboris. Do do
        pariatur sunt enim non qui amet voluptate. Officia eiusmod quis eu irure
        et tempor qui cupidatat aliqua commodo voluptate aliquip duis excepteur.
        Commodo tempor excepteur anim quis et ipsum. Labore reprehenderit ad
        aliquip deserunt commodo incididunt fugiat veniam in ullamco culpa
        fugiat eu. Lorem pariatur ex officia non quis nostrud adipisicing velit
        dolore nostrud aliqua. Eu adipisicing amet incididunt nisi qui. Sit
        consectetur ut voluptate Lorem sunt tempor laboris consequat consequat.
        Qui veniam veniam quis aliquip sint est deserunt nostrud. Ex voluptate
        anim mollit sit exercitation. Exercitation pariatur aute amet enim irure
        nulla elit pariatur aliqua minim. Adipisicing eiusmod non ut laborum
        consectetur ut ad occaecat aute incididunt dolore. Laborum deserunt amet
        ut sint cillum labore officia ut dolore quis tempor.
      </p>
    </ContentWrapper>
  )
}
const PartnershipContent = () => {
  return (
    <ContentWrapper value="partnership">
      <p className="inclusive">
        Qui veniam proident sit elit eiusmod tempor culpa. Fugiat elit sint
        magna labore velit. Anim dolore veniam veniam dolor laboris enim
        ullamco. Ad duis culpa dolor duis commodo commodo eu non ullamco qui
        dolore commodo. Nostrud aliqua do commodo deserunt qui sunt exercitation
        pariatur irure reprehenderit nostrud aute dolor. In anim commodo sit
        pariatur sint occaecat ex nulla fugiat reprehenderit deserunt.
        Incididunt commodo reprehenderit dolore occaecat voluptate quis dolor
        veniam consectetur excepteur non dolor. Dolore ullamco aute eiusmod
        adipisicing incididunt fugiat ullamco et et sunt. Fugiat elit officia
        sunt irure et. Consectetur labore ex duis occaecat nisi sint veniam
        mollit proident. Nostrud proident dolore proident laboris. Do do
        pariatur sunt enim non qui amet voluptate. Officia eiusmod quis eu irure
        et tempor qui cupidatat aliqua commodo voluptate aliquip duis excepteur.
        Commodo tempor excepteur anim quis et ipsum. Labore reprehenderit ad
        aliquip deserunt commodo incididunt fugiat veniam in ullamco culpa
        fugiat eu. Lorem pariatur ex officia non quis nostrud adipisicing velit
        dolore nostrud aliqua. Eu adipisicing amet incididunt nisi qui. Sit
        consectetur ut voluptate Lorem sunt tempor laboris consequat consequat.
        Qui veniam veniam quis aliquip sint est deserunt nostrud. Ex voluptate
        anim mollit sit exercitation. Exercitation pariatur aute amet enim irure
        nulla elit pariatur aliqua minim. Adipisicing eiusmod non ut laborum
        consectetur ut ad occaecat aute incididunt dolore. Laborum deserunt amet
        ut sint cillum labore officia ut dolore quis tempor.
      </p>
    </ContentWrapper>
  )
}
const VolunteerContent = () => {
  return (
    <ContentWrapper value="volunteer">
      <p className="inclusive">
        Qui veniam proident sit elit eiusmod tempor culpa. Fugiat elit sint
        magna labore velit. Anim dolore veniam veniam dolor laboris enim
        ullamco. Ad duis culpa dolor duis commodo commodo eu non ullamco qui
        dolore commodo. Nostrud aliqua do commodo deserunt qui sunt exercitation
        pariatur irure reprehenderit nostrud aute dolor. In anim commodo sit
        pariatur sint occaecat ex nulla fugiat reprehenderit deserunt.
        Incididunt commodo reprehenderit dolore occaecat voluptate quis dolor
        veniam consectetur excepteur non dolor. Dolore ullamco aute eiusmod
        adipisicing incididunt fugiat ullamco et et sunt. Fugiat elit officia
        sunt irure et. Consectetur labore ex duis occaecat nisi sint veniam
        mollit proident. Nostrud proident dolore proident laboris. Do do
        pariatur sunt enim non qui amet voluptate. Officia eiusmod quis eu irure
        et tempor qui cupidatat aliqua commodo voluptate aliquip duis excepteur.
        Commodo tempor excepteur anim quis et ipsum. Labore reprehenderit ad
        aliquip deserunt commodo incididunt fugiat veniam in ullamco culpa
        fugiat eu. Lorem pariatur ex officia non quis nostrud adipisicing velit
        dolore nostrud aliqua. Eu adipisicing amet incididunt nisi qui. Sit
        consectetur ut voluptate Lorem sunt tempor laboris consequat consequat.
        Qui veniam veniam quis aliquip sint est deserunt nostrud. Ex voluptate
        anim mollit sit exercitation. Exercitation pariatur aute amet enim irure
        nulla elit pariatur aliqua minim. Adipisicing eiusmod non ut laborum
        consectetur ut ad occaecat aute incididunt dolore. Laborum deserunt amet
        ut sint cillum labore officia ut dolore quis tempor.
      </p>
    </ContentWrapper>
  )
}
const ContactContent = () => {
  return (
    <ContentWrapper value="contact">
      <p className="inclusive">
        Qui veniam proident sit elit eiusmod tempor culpa. Fugiat elit sint
        magna labore velit. Anim dolore veniam veniam dolor laboris enim
        ullamco. Ad duis culpa dolor duis commodo commodo eu non ullamco qui
        dolore commodo. Nostrud aliqua do commodo deserunt qui sunt exercitation
        pariatur irure reprehenderit nostrud aute dolor. In anim commodo sit
        pariatur sint occaecat ex nulla fugiat reprehenderit deserunt.
        Incididunt commodo reprehenderit dolore occaecat voluptate quis dolor
        veniam consectetur excepteur non dolor. Dolore ullamco aute eiusmod
        adipisicing incididunt fugiat ullamco et et sunt. Fugiat elit officia
        sunt irure et. Consectetur labore ex duis occaecat nisi sint veniam
        mollit proident. Nostrud proident dolore proident laboris. Do do
        pariatur sunt enim non qui amet voluptate. Officia eiusmod quis eu irure
        et tempor qui cupidatat aliqua commodo voluptate aliquip duis excepteur.
        Commodo tempor excepteur anim quis et ipsum. Labore reprehenderit ad
        aliquip deserunt commodo incididunt fugiat veniam in ullamco culpa
        fugiat eu. Lorem pariatur ex officia non quis nostrud adipisicing velit
        dolore nostrud aliqua. Eu adipisicing amet incididunt nisi qui. Sit
        consectetur ut voluptate Lorem sunt tempor laboris consequat consequat.
        Qui veniam veniam quis aliquip sint est deserunt nostrud. Ex voluptate
        anim mollit sit exercitation. Exercitation pariatur aute amet enim irure
        nulla elit pariatur aliqua minim. Adipisicing eiusmod non ut laborum
        consectetur ut ad occaecat aute incididunt dolore. Laborum deserunt amet
        ut sint cillum labore officia ut dolore quis tempor.
      </p>
    </ContentWrapper>
  )
}

const Content = () => {
  return (
    <>
      <AboutContent />
      <ValuesContent />
      <PartnershipContent />
      <VolunteerContent />
      <ContactContent />
    </>
  )
}

function AboutPage() {
  const trigger_style =
    'formadjr pl-[1rem] text-white text-2xl data-[state=inactive]: data-[state=inactive]: data-[state=inactive]:text-slate-300 '

  return (
    <>
      <div className="hidden page w-[75vw] md:block">
        <Tabs.Root
          defaultValue="about"
          orientation="vertical"
          className=" border-[1px] mt-[2rem] text-white w-full flex min-w-full h-[80vh] "
        >
          <Windows />
          <Content />
        </Tabs.Root>
      </div>
      <MobileContent />
    </>
  )
}

export default AboutPage
