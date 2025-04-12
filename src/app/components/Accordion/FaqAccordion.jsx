'use client';
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import * as styles from "./faq.module.css"
import PrimaryButton from "../button/PrimaryButton";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const AccordionItem = ({ header, IconClass, ...rest }) => {
  const pathname = usePathname();

  // Determine if it's the "web-design" page
  const isWebDesignPage = pathname === "/services/web-design";

  return (
    <Item
      {...rest}
      header={
        <>
          {header}
          <span className={`${styles.chevron}`}>
            <span
              className={`${IconClass} ${styles?.chevron1}`}
              style={{ backgroundColor: isWebDesignPage ? "white" : "black" }}
            ></span>
            <span
              className={`${IconClass} ${styles?.chevron2}`}
              style={{ backgroundColor: isWebDesignPage ? "white" : "black" }}
            ></span>
          </span>
        </>
      }
      className={styles.item}
      buttonProps={{
        className: ({ isEnter }) =>
          `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`,
      }}
      contentProps={{ className: styles.itemContent }}
      panelProps={{ className: styles.itemPanel }}
    />
  );
};

export default function FaqAccordion({ data,accordionbgBlk=false,accordionbgwht=false,textWhite=false, ...rest }) {
  const {faqs,cantFindTitle,
    talkToUsButton} = data ||{}
const AccordionBgClr=`${accordionbgBlk?styles.accordionbgBlk:''} ${accordionbgwht?styles.accordionbgwht:''}`
const questnClr=`${textWhite?styles.textWhite:''}`
const pathname = usePathname();
const isWebDesignPage = pathname === "/services/web-design";
const isWebDevPage = pathname === "/services/web-development";
  return (
    <div className={AccordionBgClr} {...rest}>
      <div className={`${styles.faqAccordionSection} `}>
        <div className="container">
          <h2 className="heading-5-med">{data?.title}</h2>
          <div className={styles.faqaccordion}>
            <Accordion transition transitionTimeout={2000}>
              {faqs?.length > 0 &&
                faqs?.map((item, index) => (
                  <div key={index} className={styles?.faqaccordionItemWrap}>
                    <AccordionItem
                      header={
                        <div className={questnClr} {...rest}>
                          <p className={`${styles?.AccordionQustn} text-4-reg`}>
                            {item.question}
                          </p>
                        </div>
                      }
                    >
                      {/* {item?.answer?.map((e, index) => {
                      return ( */}
                      <div key={index} >
                        <div
                          dangerouslySetInnerHTML={{ __html: item.answer }} className={styles?.answerSec}
                        />
                        {/* <p className="text-5">{e.text1}</p>
                          <ul className={styles?.answerSecPoints}>
                            {e?.points?.map((i, index) => {
                              return (
                                <li key={index} className="text-5">
                                  {" "}
                                  {i.point}
                                </li>
                              );
                            })}
                          </ul>
                          <p className="text-5">{e.text2}</p> */}
                      </div>
                      {/* );
                    })} */}
                    </AccordionItem>
                  </div>
                ))}
            </Accordion>
          </div>
          <div className={styles?.faqBtnSection}>
            {cantFindTitle && <Link
              href={'/contact'}
              className={`${styles?.talktext} text-3-reg`}
            >
              {cantFindTitle}
            </Link> }
             {talkToUsButton && <PrimaryButton label={talkToUsButton} href={"/contact"} className={`${isWebDesignPage ? styles?.AccordiondesignBtn : ''} ${isWebDevPage ? styles?.AccordiondevBtn : ''}`} 
            buttontextblk={pathname === "/services/web-development" ? true:false} noBg={pathname === "/services/web-development"? true:false}
            />}
          </div>
        </div>
      </div>
    </div>
  );
}