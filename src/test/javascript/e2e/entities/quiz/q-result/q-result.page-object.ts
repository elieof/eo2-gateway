import { by, element, ElementFinder } from 'protractor';

export class QResultComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-q-result div table .btn-danger'));
  title = element.all(by.css('jhi-q-result div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class QResultUpdatePage {
  pageTitle = element(by.id('jhi-q-result-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  usernameInput = element(by.id('field_username'));
  validInput = element(by.id('field_valid'));

  questionSelect = element(by.id('field_question'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUsernameInput(username: string): Promise<void> {
    await this.usernameInput.sendKeys(username);
  }

  async getUsernameInput(): Promise<string> {
    return await this.usernameInput.getAttribute('value');
  }

  getValidInput(): ElementFinder {
    return this.validInput;
  }

  async questionSelectLastOption(): Promise<void> {
    await this.questionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async questionSelectOption(option: string): Promise<void> {
    await this.questionSelect.sendKeys(option);
  }

  getQuestionSelect(): ElementFinder {
    return this.questionSelect;
  }

  async getQuestionSelectedOption(): Promise<string> {
    return await this.questionSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class QResultDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-qResult-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-qResult'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
