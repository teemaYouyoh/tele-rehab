import React from 'react';
// import about from '../../img/About/about-photo.png'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
const Questions = () => {
  return (
    <div className="questions" id="questions">
        <div className="container">
            <div className="questions-wrap">
                <h2 className="questions-title">Вопрос-Ответ</h2>
            </div>
            <div className="questions-section">
            <Accordion>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Вопрос номер 1 и ответ на него по клику
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                            Exercitation in fugiat est ut ad ea cupidatat ut in
                            cupidatat occaecat ut occaecat consequat est minim minim
                            esse tempor laborum consequat esse adipisicing eu
                            reprehenderit enim.
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Вопрос номер 1 и ответ на него по клику
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                            In ad velit in ex nostrud dolore cupidatat consectetur
                            ea in ut nostrud velit in irure cillum tempor laboris
                            sed adipisicing eu esse duis nulla non.
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Вопрос номер 1 и ответ на него по клику
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                            In ad velit in ex nostrud dolore cupidatat consectetur
                            ea in ut nostrud velit in irure cillum tempor laboris
                            sed adipisicing eu esse duis nulla non.
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Вопрос номер 1 и ответ на него по клику
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                            In ad velit in ex nostrud dolore cupidatat consectetur
                            ea in ut nostrud velit in irure cillum tempor laboris
                            sed adipisicing eu esse duis nulla non.
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
            </div>
        </div>
    </div>
  );
};

export default Questions;