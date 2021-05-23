import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PersonAreaHeader from '../Header/PersonAreaHeader';
import FooterBottom from '../Footer/FooterBottom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')
const PersonArea = () => {
const [modalIsOpen,setIsOpen] = React.useState(false);
function openModal() {
    setIsOpen(true);
}
function afterOpenModal() {
}

function closeModal(){
    setIsOpen(false);
}  
  return (
    <div className="person-area">
        <PersonAreaHeader />
        <div className="person-section">
            <div className="container">
                <div className="person-connections">
                    <a className="person-connections__link" href="#">
                        <svg width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 0.625C6.73057 0.625 0.816406 6.53916 0.816406 13.8086C0.816406 14.6142 0.816406 20.8462 0.816406 20.957C0.816406 22.4109 1.99924 23.5938 3.45312 23.5938H4.4832C4.84602 24.6167 5.82295 25.3516 6.96875 25.3516C8.42264 25.3516 9.60547 24.1687 9.60547 22.7148V15.5664C9.60547 14.1125 8.42264 12.9297 6.96875 12.9297C5.82295 12.9297 4.84602 13.6646 4.4832 14.6875H3.45312C3.14498 14.6875 2.84932 14.7411 2.57422 14.8387V13.8086C2.57422 7.50842 7.69982 2.38281 14 2.38281C20.3002 2.38281 25.4258 7.50842 25.4258 13.8086V14.8387C25.1507 14.7411 24.855 14.6875 24.5469 14.6875H23.5168C23.154 13.6646 22.1771 12.9297 21.0312 12.9297C19.5774 12.9297 18.3945 14.1125 18.3945 15.5664V22.7148C18.3945 24.1687 19.5774 25.3516 21.0312 25.3516C21.2973 25.3516 21.5542 25.3116 21.7965 25.2379C21.4678 26.3197 20.4613 27.1094 19.2734 27.1094H16.4855C16.1227 26.0864 15.1458 25.3516 14 25.3516C12.5461 25.3516 11.3633 26.5344 11.3633 27.9883C11.3633 29.4422 12.5461 30.625 14 30.625C15.1458 30.625 16.1227 29.8901 16.4855 28.8672H19.2734C21.6966 28.8672 23.668 26.8958 23.668 24.4727V23.5938H24.5469C26.0008 23.5938 27.1836 22.4109 27.1836 20.957C27.1836 20.8478 27.1836 14.6136 27.1836 13.8086C27.1836 6.53916 21.2694 0.625 14 0.625ZM6.08984 15.5664C6.08984 15.0818 6.48412 14.6875 6.96875 14.6875C7.45338 14.6875 7.84766 15.0818 7.84766 15.5664V22.7148C7.84766 23.1995 7.45338 23.5938 6.96875 23.5938C6.48412 23.5938 6.08984 23.1995 6.08984 22.7148V15.5664ZM3.45312 16.4453H4.33203V21.8359H3.45312C2.9685 21.8359 2.57422 21.4417 2.57422 20.957V17.3242C2.57422 16.8396 2.9685 16.4453 3.45312 16.4453ZM14 28.8672C13.5154 28.8672 13.1211 28.4729 13.1211 27.9883C13.1211 27.5037 13.5154 27.1094 14 27.1094C14.4846 27.1094 14.8789 27.5037 14.8789 27.9883C14.8789 28.4729 14.4846 28.8672 14 28.8672ZM21.9102 22.7148C21.9102 23.1995 21.5159 23.5938 21.0312 23.5938C20.5466 23.5938 20.1523 23.1995 20.1523 22.7148V15.5664C20.1523 15.0818 20.5466 14.6875 21.0312 14.6875C21.5159 14.6875 21.9102 15.0818 21.9102 15.5664V22.7148ZM25.4258 20.957C25.4258 21.4417 25.0315 21.8359 24.5469 21.8359H23.668V16.4453H24.5469C25.0315 16.4453 25.4258 16.8396 25.4258 17.3242V20.957Z" fill="#00398F"/>
                        </svg>
                        Обратная связь
                    </a>
                    <a className="person-connections__link" href="#">
                        <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.17 7.57374C21.9687 7.46499 21.72 7.47624 21.5288 7.60497L18.75 9.45747V8.12499C18.75 7.77999 18.47 7.49997 18.125 7.49997H9.375C7.5525 7.49997 7.5 11.9887 7.5 12.5C7.5 13.0112 7.5525 17.5 9.375 17.5H18.125C18.47 17.5 18.75 17.22 18.75 16.875V15.5425L21.5288 17.395C21.6325 17.465 21.7538 17.5 21.875 17.5C21.9762 17.5 22.0775 17.475 22.17 17.4262C22.3725 17.3175 22.5 17.1062 22.5 16.875V8.12499C22.5 7.89372 22.3737 7.68249 22.17 7.57374ZM21.25 15.7075L18.4713 13.855C18.28 13.7275 18.0325 13.7162 17.83 13.8238C17.6275 13.9325 17.5 14.1437 17.5 14.375V16.2512L9.4875 16.2775C9.23877 16.0987 8.74998 14.7662 8.74998 12.5C8.74998 10.2338 9.23871 8.90124 9.375 8.75001H17.5V10.625C17.5 10.8563 17.6263 11.0675 17.83 11.1763C18.0325 11.285 18.28 11.2725 18.4713 11.145L21.25 9.29253V15.7075Z" fill="#00398F"/>
                            <path d="M25.625 1.25003H4.37502C1.96248 1.25003 0 3.21251 0 5.62499V19.375C0 21.7875 1.96248 23.75 4.37502 23.75H6.25002V29.375C6.25002 29.6175 6.39 29.8388 6.61002 29.9413C6.69375 29.98 6.78504 30 6.87504 30C7.01877 30 7.16127 29.9501 7.27506 29.855L14.6013 23.75H25.6251C28.0375 23.75 30 21.7875 30 19.375V5.62499C30 3.21251 28.0375 1.25003 25.625 1.25003ZM28.75 19.375C28.75 21.0975 27.3475 22.5 25.625 22.5H14.375C14.2288 22.5 14.0875 22.5513 13.975 22.645L7.5 28.0413V23.125C7.5 22.78 7.21998 22.5 6.87498 22.5H4.37502C2.65254 22.5 1.25004 21.0975 1.25004 19.375V5.62499C1.24998 3.90251 2.65248 2.50001 4.37502 2.50001H25.625C27.3475 2.50001 28.75 3.90251 28.75 5.62499V19.375Z" fill="#00398F"/>
                        </svg>
                        Видео-конференция
                    </a>
                </div>
                <div className="person-desk">
                    <h2>Петров Дмитрий Сергеевич</h2>
                    <div className="person-tabs">
                        <Tabs>
                            <TabList>
                                <Tab>Физ упражнения</Tab>
                                <Tab>Самообслуживание</Tab>
                                <Tab>Логопед</Tab>
                                <Tab>Лист назначений</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="person-content">
                                    <div className="person-content__wrap">
                                        <div className="person-content__video">
                                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/e1GbGNYIGB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div className="person-content__info info-person">
                                            <p className="info-person__main">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в </p>
                                            <div className="info-person__statistic">
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество повторений упражнения:</p>
                                                    <p className="statistic-item__result">10</p>
                                                </div>
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество  дней к выполнению:</p>
                                                    <p className="statistic-item__result">4</p>
                                                </div>
                                            </div>
                                            <a className="info-person__review" href="#">
                                                Оставить отзывы по выполнению
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="person-content">
                                    <div className="person-content__wrap">
                                        <div className="person-content__video">
                                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/e1GbGNYIGB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div className="person-content__info info-person">
                                            <p className="info-person__main">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в </p>
                                            <div className="info-person__statistic">
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество повторений упражнения:</p>
                                                    <p className="statistic-item__result">10</p>
                                                </div>
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество  дней к выполнению:</p>
                                                    <p className="statistic-item__result">4</p>
                                                </div>
                                            </div>
                                            <a className="info-person__review" href="#">
                                                Оставить отзывы по выполнению
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="person-content">
                                    <div className="person-content__wrap">
                                        <div className="person-content__video">
                                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/e1GbGNYIGB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div className="person-content__info info-person">
                                            <p className="info-person__main">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в </p>
                                            <div className="info-person__statistic">
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество повторений упражнения:</p>
                                                    <p className="statistic-item__result">10</p>
                                                </div>
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество  дней к выполнению:</p>
                                                    <p className="statistic-item__result">4</p>
                                                </div>
                                            </div>
                                            <a className="info-person__review" href="#">
                                                Оставить отзывы по выполнению
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="person-content">
                                    <div className="person-content__wrap">
                                        <div className="person-content__video">
                                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/e1GbGNYIGB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div className="person-content__info info-person">
                                            <p className="info-person__main">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в </p>
                                            <div className="info-person__statistic">
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество повторений упражнения:</p>
                                                    <p className="statistic-item__result">10</p>
                                                </div>
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество  дней к выполнению:</p>
                                                    <p className="statistic-item__result">4</p>
                                                </div>
                                            </div>
                                            <a className="info-person__review" href="#">
                                                Оставить отзывы по выполнению
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                            <div className="person-content">
                                    <div className="person-content__wrap">
                                        <div className="person-content__video">
                                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/e1GbGNYIGB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div className="person-content__info info-person">
                                            <p className="info-person__main">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в </p>
                                            <div className="info-person__statistic">
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество повторений упражнения:</p>
                                                    <p className="statistic-item__result">10</p>
                                                </div>
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество  дней к выполнению:</p>
                                                    <p className="statistic-item__result">4</p>
                                                </div>
                                            </div>
                                            <a className="info-person__review" href="#">
                                                Оставить отзывы по выполнению
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="person-content">
                                    <div className="person-content__wrap">
                                        <div className="person-content__video">
                                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/e1GbGNYIGB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div className="person-content__info info-person">
                                            <p className="info-person__main">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в </p>
                                            <div className="info-person__statistic">
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество повторений упражнения:</p>
                                                    <p className="statistic-item__result">10</p>
                                                </div>
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество  дней к выполнению:</p>
                                                    <p className="statistic-item__result">4</p>
                                                </div>
                                            </div>
                                            <a className="info-person__review" href="#">
                                                Оставить отзывы по выполнению
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                            <div className="person-content">
                                    <div className="person-content__wrap">
                                        <div className="person-content__video">
                                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/e1GbGNYIGB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div className="person-content__info info-person">
                                            <p className="info-person__main">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в </p>
                                            <div className="info-person__statistic">
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество повторений упражнения:</p>
                                                    <p className="statistic-item__result">10</p>
                                                </div>
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество  дней к выполнению:</p>
                                                    <p className="statistic-item__result">4</p>
                                                </div>
                                            </div>
                                            <a className="info-person__review" href="#">
                                                Оставить отзывы по выполнению
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                            <div className="person-content">
                                    <div className="person-content__wrap">
                                        <div className="person-content__video">
                                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/e1GbGNYIGB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div className="person-content__info info-person">
                                            <p className="info-person__main">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в </p>
                                            <div className="info-person__statistic">
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество повторений упражнения:</p>
                                                    <p className="statistic-item__result">10</p>
                                                </div>
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество  дней к выполнению:</p>
                                                    <p className="statistic-item__result">4</p>
                                                </div>
                                            </div>
                                            <a className="info-person__review" href="#">
                                                Оставить отзывы по выполнению
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="person-content">
                                    <div className="person-content__wrap">
                                        <div className="person-content__video">
                                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/e1GbGNYIGB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div className="person-content__info info-person">
                                            <p className="info-person__main">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в </p>
                                            <div className="info-person__statistic">
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество повторений упражнения:</p>
                                                    <p className="statistic-item__result">10</p>
                                                </div>
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество  дней к выполнению:</p>
                                                    <p className="statistic-item__result">4</p>
                                                </div>
                                            </div>
                                            <a className="info-person__review" href="#">
                                                Оставить отзывы по выполнению
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="person-content">
                                    <div className="person-content__wrap">
                                        <div className="person-content__video">
                                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/e1GbGNYIGB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div className="person-content__info info-person">
                                            <p className="info-person__main">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в </p>
                                            <div className="info-person__statistic">
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество повторений упражнения:</p>
                                                    <p className="statistic-item__result">10</p>
                                                </div>
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество  дней к выполнению:</p>
                                                    <p className="statistic-item__result">4</p>
                                                </div>
                                            </div>
                                            <a className="info-person__review" href="#">
                                                Оставить отзывы по выполнению
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="person-content">
                                    <div className="person-content__wrap">
                                        <div className="person-content__video">
                                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/e1GbGNYIGB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div className="person-content__info info-person">
                                            <p className="info-person__main">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в </p>
                                            <div className="info-person__statistic">
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество повторений упражнения:</p>
                                                    <p className="statistic-item__result">10</p>
                                                </div>
                                                <div className="statistic-item">
                                                    <p className="statistic-item__name">Количество  дней к выполнению:</p>
                                                    <p className="statistic-item__result">4</p>
                                                </div>
                                            </div>
                                            <a className="info-person__review" href="#">
                                                Оставить отзывы по выполнению
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div className="person-comment">
                        <form action="#" name="comment-form" id="comment-form">
                            <textarea name="comment-text" id="comment-text" placeholder="Ваш комменантарий. Насколько было сложно, больше и так далее">
                            </textarea>
                            <button className="person-comment__btn">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.87717 0.711066C1.74216 0.64304 1.59092 0.61455 1.44065 0.628839C1.29037 0.643128 1.14709 0.699621 1.0271 0.791893C0.907118 0.884164 0.815244 1.00851 0.761933 1.15079C0.708622 1.29306 0.696014 1.44755 0.725543 1.59669L2.98847 9.47794C3.03066 9.62481 3.11313 9.75671 3.22641 9.85847C3.33968 9.96023 3.47915 10.0277 3.62879 10.0532L12.8063 11.6018C13.2386 11.6879 13.2386 12.3119 12.8063 12.3981L3.62879 13.9467C3.47915 13.9722 3.33968 14.0397 3.22641 14.1414C3.11313 14.2432 3.03066 14.3751 2.98847 14.5219L0.725543 22.4032C0.696014 22.5523 0.708622 22.7068 0.761933 22.8491C0.815244 22.9914 0.907118 23.1157 1.0271 23.208C1.14709 23.3003 1.29037 23.3568 1.44065 23.371C1.59092 23.3853 1.74216 23.3568 1.87717 23.2888L22.8451 12.7263C22.9789 12.6588 23.0913 12.555 23.17 12.4268C23.2486 12.2985 23.2902 12.1507 23.2902 11.9999C23.2902 11.8492 23.2486 11.7014 23.17 11.5731C23.0913 11.4448 22.9789 11.3411 22.8451 11.2736L1.87717 0.711066Z" fill="white"/>
                                </svg>
                            </button>
                        </form>
                        <button onClick={openModal}  className="person-comment__true" href="#">Подтвердить прохождение программы</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal">
              <div className="popup-downloud">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.6875 5.6875H12.1875C11.6697 5.6875 11.25 6.10725 11.25 6.625C11.25 7.14275 11.6697 7.5625 12.1875 7.5625H19.6875C20.2052 7.5625 20.625 7.14275 20.625 6.625C20.625 6.10725 20.2052 5.6875 19.6875 5.6875Z" fill="#8B8B8B"/>
            <path d="M19.6875 9.4375H12.1875C11.6697 9.4375 11.25 9.85725 11.25 10.375C11.25 10.8928 11.6697 11.3125 12.1875 11.3125H19.6875C20.2052 11.3125 20.625 10.8928 20.625 10.375C20.625 9.85725 20.2052 9.4375 19.6875 9.4375Z" fill="#8B8B8B"/>
            <path d="M19.6875 13.1875H4.6875C4.16975 13.1875 3.75 13.6072 3.75 14.125C3.75 14.6428 4.16975 15.0625 4.6875 15.0625H19.6875C20.2052 15.0625 20.625 14.6428 20.625 14.125C20.625 13.6072 20.2052 13.1875 19.6875 13.1875Z" fill="#8B8B8B"/>
            <path d="M16.2889 16.9375H4.6875C4.16975 16.9375 3.75 17.3572 3.75 17.875C3.75 18.3928 4.16975 18.8125 4.6875 18.8125H16.2889C16.8066 18.8125 17.2264 18.3928 17.2264 17.875C17.2264 17.3572 16.8066 16.9375 16.2889 16.9375Z" fill="#8B8B8B"/>
            <path d="M24.4375 16.9375V2.8125C24.4375 1.258 23.119 0 21.5625 0H8.43738C8.19969 0 7.95519 0.094 7.77187 0.277375L0.271875 7.83988C0.0995625 8.01356 0 8.25513 0 8.5V29.1875C0 30.7383 1.26169 32 2.8125 32C4.79037 32 5.44712 32 5.44431 32C8.3195 32 13.9771 32 24.4375 32C28.5771 32 32 28.5916 32 24.4375C32 20.302 28.6075 16.9375 24.4375 16.9375ZM7.5 3.21419V7.5625H3.18762L7.5 3.21419ZM2.8125 30.125C2.29556 30.125 1.875 29.7044 1.875 29.1875V9.4375H8.4375C8.95525 9.4375 9.375 9.01775 9.375 8.5V1.875H21.5625C22.0952 1.875 22.5625 2.31306 22.5625 2.8125V17.1709C20.5726 17.6762 18.8964 18.9662 17.8902 20.6875H4.6875C4.16975 20.6875 3.75 21.1073 3.75 21.625C3.75 22.1427 4.16975 22.5625 4.6875 22.5625H17.1143C16.9581 23.162 16.875 23.7903 16.875 24.4375H4.6875C4.16975 24.4375 3.75 24.8573 3.75 25.375C3.75 25.8927 4.16975 26.3125 4.6875 26.3125H17.1128C17.4917 27.7786 18.3111 29.0999 19.4804 30.125H2.8125ZM24.4375 30.125C21.3546 30.125 18.75 27.5204 18.75 24.4375C18.75 21.3359 21.3014 18.8125 24.4375 18.8125C27.5736 18.8125 30.125 21.3359 30.125 24.4375C30.125 27.5204 27.5204 30.125 24.4375 30.125Z" fill="#8B8B8B"/>
            <path d="M27.9808 22.8426C27.6178 22.4735 27.0242 22.4686 26.655 22.8316L23.4947 25.9402L22.2144 24.7013C21.8424 24.3412 21.2489 24.351 20.8888 24.7231C20.5287 25.0951 20.5385 25.6886 20.9105 26.0487L22.848 27.9237C23.2135 28.2774 23.7945 28.2752 24.1574 27.9184L27.9699 24.1684C28.339 23.8053 28.3439 23.2117 27.9808 22.8426Z" fill="#8B8B8B"/>
            </svg>
            <h2 className="popup-title">Лист назначения</h2>
            <button className="btn">Скачать</button>
            <button className="popup-close" onClick={closeModal}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.45868 6L11.5407 1.91797C11.7344 1.72458 11.8434 1.46215 11.8437 1.18841C11.8439 0.914677 11.7354 0.652056 11.542 0.458324C11.3486 0.264592 11.0862 0.155618 10.8124 0.155376C10.5387 0.155135 10.2761 0.263644 10.0824 0.457035L6.00032 4.53906L1.91829 0.457035C1.72456 0.263302 1.4618 0.154465 1.18782 0.154465C0.913845 0.154465 0.651088 0.263302 0.457355 0.457035C0.263623 0.650767 0.154785 0.913524 0.154785 1.1875C0.154785 1.46148 0.263623 1.72424 0.457355 1.91797L4.53939 6L0.457355 10.082C0.263623 10.2758 0.154785 10.5385 0.154785 10.8125C0.154785 11.0865 0.263623 11.3492 0.457355 11.543C0.651088 11.7367 0.913845 11.8455 1.18782 11.8455C1.4618 11.8455 1.72456 11.7367 1.91829 11.543L6.00032 7.46094L10.0824 11.543C10.2761 11.7367 10.5388 11.8455 10.8128 11.8455C11.0868 11.8455 11.3496 11.7367 11.5433 11.543C11.737 11.3492 11.8459 11.0865 11.8459 10.8125C11.8459 10.5385 11.737 10.2758 11.5433 10.082L7.45868 6Z" fill="black" fill-opacity="0.19"/>
            </svg>
            </button>
              </div>
        </Modal>
      </div>
         <FooterBottom />
    </div>
  );
};

export default PersonArea;