import ReCAPTCHA, {ReCAPTCHAProps} from 'react-google-recaptcha';
import styles from './reCaptcha.module.css';

type ReCaptchaPropsType = {
    /** Text error message */
    errorMessage?: string | null
    // The function onChange to be called when the user successfully completes the normal or the compact captcha.
    // It will also be called with null, when captcha expires.
    onChange: (value: string | null) => void
    theme?: 'dark' | 'light'
} & Omit<ReCAPTCHAProps, 'sitekey'>;

/**
 * ReCAPTCHA UI component
 */

export const ReCaptcha = (props: ReCaptchaPropsType) => {

    const {theme = 'dark', errorMessage, ...restProps} = props

    return (
        <div className={`${styles.wrapper} ${errorMessage && styles.errorBorder}`}>
            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} {...restProps} theme={theme}
                       hl={'en-GB'}/>
            {errorMessage &&
                <span className={styles.errorMessage}>{errorMessage}</span>}
        </div>
    );
};
