import EmailIcon from '@/assets/svg/email.svg';
import GithubIcon from '@/assets/svg/github.svg';

export default function Footer() {
  return (
    <>
      <div className="border-0 sm:border-t-1 dark:border-#ffffff26 flex flex-col md:flex-row justify-between pt-50px pb-50px mt-250px text-center">
        <div className="text-#73737D text-14px">©版权归 小王说前端 所有</div>
        <ul className="flex gap-x-20px justify-center mt-80px md:mt-0">
          <li>
            <a href="https://github.com/wjie1994/blogs">
              <GithubIcon className="icon-btn" />
            </a>
          </li>
          <li>
            <a href="mailto:wjie2021@163.com">
              <EmailIcon className="icon-btn" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
