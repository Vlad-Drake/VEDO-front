import classes from './loaderKit.module.scss';
import Circle from '../buttonKit/assets/circle.svg';

export function LoaderKit() {
    return (
        <div className={classes["loader"]}>
          <img src={Circle} alt="" />
        </div>
    );
}