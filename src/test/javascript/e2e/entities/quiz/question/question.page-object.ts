import { by, element, ElementFinder } from 'protractor';

export class QuestionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-question div table .btn-danger'));
  title = element.all(by.css('jhi-question div h2#page-heading span')).first();
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

export class QuestionUpdatePage {
  pageTitle = element(by.id('jhi-question-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  statementInput = element(by.id('field_statement'));
  levelInput = element(by.id('field_level'));

  topicSelect = element(by.id('field_topic'));
  quizSelect = element(by.id('field_quiz'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStatementInput(statement: string): Promise<void> {
    await this.statementInput.sendKeys(statement);
  }

  async getStatementInput(): Promise<string> {
    return await this.statementInput.getAttribute('value');
  }

  async setLevelInput(level: string): Promise<void> {
    await this.levelInput.sendKeys(level);
  }

  async getLevelInput(): Promise<string> {
    return await this.levelInput.getAttribute('value');
  }

  async topicSelectLastOption(): Promise<void> {
    await this.topicSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async topicSelectOption(option: string): Promise<void> {
    await this.topicSelect.sendKeys(option);
  }

  getTopicSelect(): ElementFinder {
    return this.topicSelect;
  }

  async getTopicSelectedOption(): Promise<string> {
    return await this.topicSelect.element(by.css('option:checked')).getText();
  }

  async quizSelectLastOption(): Promise<void> {
    await this.quizSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async quizSelectOption(option: string): Promise<void> {
    await this.quizSelect.sendKeys(option);
  }

  getQuizSelect(): ElementFinder {
    return this.quizSelect;
  }

  async getQuizSelectedOption(): Promise<string> {
    return await this.quizSelect.element(by.css('option:checked')).getText();
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

export class QuestionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-question-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-question'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
