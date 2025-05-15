import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routers';
import classes from './header.module.scss';

export function AppHeader() {
    return (
        <div className={classes["navbar"]}>
        <div className={classes["navbar__content"]}>

            <section className={`${classes["start"]} ${classes["navbar-section"]}`}>
                <Link to={ ROUTES.HOME }>ВЭДО</Link>
            </section>

            <section className={classes["center"]}>
                {/*<section class="navbar-section">
                    <router-link :to="'/common-docs-info'" class="link">Общие сведения о системе&nbsp;</router-link>
                </section>

                <section class="navbar-section" ref="selectorContainerDocs">
                    <p>Типы документов ▼&nbsp;</p>

                    <transition name="fade">
                        <div v-if="isDocs" class="wiki-list-body">   
                            <div class="wiki-list scrollable">
                                <router-link v-for="doc in docs" :to='{path: "/docinfo/" + `${doc.id}`}' class="link">{{ doc.id }}. {{ doc.name }}</router-link>
                            </div>
                        </div>
                    </transition>
                </section>

                <section class="navbar-section">
                    <router-link to="/admin" class="link">Администрирование&nbsp;</router-link>
                </section>

                <section class="navbar-section" ref="selectorContainerDepartments">
                    <p>Настройки филиалов ▼&nbsp;</p>

                    <transition name="fade">
                        <div v-if="isDepartments" class="wiki-list-body">   
                            <div class="wiki-list scrollable">
                                <router-link v-for="dep in settingsDepartment" :to='{path: dep.path }' class="link">{{ dep.name }}</router-link>
                            </div>
                        </div>
                    </transition>
                </section>*/}
            </section>
            
            <section className={classes["end"]}>
                {/*<img src="@/assets/VEDO-ico.svg" alt="">*/}
            </section>

        </div>
        
    </div>
    );
}
  