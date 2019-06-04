module PollsTestHelper
  private

  def expected_polls_for_user
    {
      'polls' => [
        {
          'poll_id' => 1,
          'question' => 'Fav snake',
          'categories' => [[3, 'Animals']],
          'options' => {
            'Python' => {'option_id' => 1},
            'Cobra' => {'option_id' => 2},
            'Viper' => {'option_id' => 3,},
            'Mamba' => {'option_id' => 4}
          }
        },
        {
          'poll_id' => 2,
          'question' => 'Fav programming language',
          'categories' => [[1, 'It'], [2, 'Programming languages']],
          'options' => {
            'Python' => {'option_id' => 1},
            'Java' => {'option_id' => 5},
            'JavaScript' => {'option_id' => 6},
            'Ruby' => {'option_id' => 7}
          }
        },
        {
          'poll_id' => 3,
          'question' => 'Some dumb question',
          'categories' => [],
          'options' => {
            'Crazy' => {'option_id' => 12},
            'Stupid' => {'option_id' => 13},
            'Annoying' => {'option_id' => 14}
          }
        },
        {
          'poll_id' => 4,
          'question' => 'Fav gems',
          'categories' => [[4, 'Gems']],
          'options' => {
            'Ruby' => {'option_id' => 7,},
            'Gold' => {'option_id' => 8,},
            'Dimond' => {'option_id' => 9,},
            'Emerald' => {'option_id' => 10,},
            'Platinum' => {'option_id' => 11}
          }
        }
      ]
    }

  end

  def create_params
    {
      poll: {
        question: 'My question',
        options: ['opt1', 'opt2', 'opt3', 'opt4'],
        category_ids: ['1'],
      }
    }
  end

  def create_dup_params
    {
      poll: {
        question: 'Fav snake',
        options: ['opt1', 'opt2', 'opt3', 'opt4'],
        category_ids: ['1']
      }
    }
  end
end
