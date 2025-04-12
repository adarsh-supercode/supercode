import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import styles from "./rolesAccordion.module.css";

const AccordionItem = ({ header, IconClass, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <span className={styles.chevron}>
          <span className={`${IconClass} ${styles?.chevron1} `}></span>
          <span className={`${IconClass} ${styles?.chevron2} `}></span>
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

export default function RolesAccordion({ data }) {

  return (
    <div>
      <div className={styles.accordion}>
        <Accordion transition transitionTimeout={2000}>
          {data.map((item, index) => (
            <div key={index} className={styles?.accordionItemWrap}>
              <AccordionItem
                header={<p className="text-4-reg clr-wh">{item.jobName}</p>}
              >
                <div className={`${styles.accordionContent}`}>
                  <div className={`${styles.location} clr-wh text-5`}>
                    {item.jobLoaction}
                  </div>
                  <div className={styles.details}>
                    {item.whatsTheRole?.map((detail, inx) => {
                      return (
                        <div key={inx} className={styles.detailSection}>
                          <h3 className={`${styles?.detailTitle} text-6-med uppercase`}>
                            {detail.title}
                          </h3>
                          <div
                           className={styles?.detailDescription}
                            dangerouslySetInnerHTML={{
                              __html: detail.description,
                            }}
                          />
                          <p
                            className={`${styles?.resumeLink} text-5 clr-wh`}
                            dangerouslySetInnerHTML={{
                              __html: detail.resumeLink,
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
