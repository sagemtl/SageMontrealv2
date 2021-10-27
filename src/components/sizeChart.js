import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const SizeChart = (props) => {
  const { modalOpen, setModalOpen } = props;
  return (
    <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
      <DialogContent>
        <header className="size-guide__heading">
          Size Guides: Short sleeve T-shirts (inches) <br />
          *May shrink ±1 inch after washing
        </header>
        <div>
          <table>
            <tbody>
              <tr>
                <th> </th>
                <th>S</th>
                <th>M</th>
                <th>L</th>
                <th>XL</th>
              </tr>
              <tr>
                <th>Chest</th>
                <th>20.5</th>
                <th>21.5</th>
                <th>22</th>
                <th>23.5</th>
              </tr>
              <tr>
                <th>Length</th>
                <th>25.5</th>
                <th>27</th>
                <th>28.5</th>
                <th>29.5</th>
              </tr>
            </tbody>
          </table>
        </div>
        <header className="size-guide__heading">Hoodie (inches)</header>
        <div>
          <table>
            <tbody>
              <tr>
                <th> </th>
                <th>M</th>
                <th>L</th>
                <th>XL</th>
              </tr>
              <tr>
                <th>Chest</th>
                <th>25</th>
                <th>26</th>
                <th>27</th>
              </tr>
              <tr>
                <th>Sleeves</th>
                <th>21</th>
                <th>22.5</th>
                <th>23.5</th>
              </tr>
              <tr>
                <th>Length</th>
                <th>26.5</th>
                <th>27.5</th>
                <th>28.5</th>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeChart;
