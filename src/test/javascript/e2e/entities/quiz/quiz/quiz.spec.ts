import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { QuizComponentsPage, QuizDeleteDialog, QuizUpdatePage } from './quiz.page-object';

const expect = chai.expect;

describe('Quiz e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let quizComponentsPage: QuizComponentsPage;
  let quizUpdatePage: QuizUpdatePage;
  let quizDeleteDialog: QuizDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Quizzes', async () => {
    await navBarPage.goToEntity('quiz');
    quizComponentsPage = new QuizComponentsPage();
    await browser.wait(ec.visibilityOf(quizComponentsPage.title), 5000);
    expect(await quizComponentsPage.getTitle()).to.eq('eo2GatewayApp.quizQuiz.home.title');
    await browser.wait(ec.or(ec.visibilityOf(quizComponentsPage.entities), ec.visibilityOf(quizComponentsPage.noResult)), 1000);
  });

  it('should load create Quiz page', async () => {
    await quizComponentsPage.clickOnCreateButton();
    quizUpdatePage = new QuizUpdatePage();
    expect(await quizUpdatePage.getPageTitle()).to.eq('eo2GatewayApp.quizQuiz.home.createOrEditLabel');
    await quizUpdatePage.cancel();
  });

  it('should create and save Quizzes', async () => {
    const nbButtonsBeforeCreate = await quizComponentsPage.countDeleteButtons();

    await quizComponentsPage.clickOnCreateButton();

    await promise.all([quizUpdatePage.setNameInput('name'), quizUpdatePage.setDescriptionInput('description')]);

    expect(await quizUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await quizUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');

    await quizUpdatePage.save();
    expect(await quizUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await quizComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Quiz', async () => {
    const nbButtonsBeforeDelete = await quizComponentsPage.countDeleteButtons();
    await quizComponentsPage.clickOnLastDeleteButton();

    quizDeleteDialog = new QuizDeleteDialog();
    expect(await quizDeleteDialog.getDialogTitle()).to.eq('eo2GatewayApp.quizQuiz.delete.question');
    await quizDeleteDialog.clickOnConfirmButton();

    expect(await quizComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
